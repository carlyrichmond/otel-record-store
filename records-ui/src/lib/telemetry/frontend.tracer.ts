/* OpenTelemetry Frontend packages */

// Import the WebTracerProvider, which is the core provider for browser-based tracing
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

// Used to auto-register built-in instrumentations like page load and user interaction
import { registerInstrumentations } from '@opentelemetry/instrumentation';

// Document Load Instrumentation automatically creates spans for document load events
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

// Automatically creates spans for user interactions like clicks
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';

// Import the auto-instrumentations for web, which includes common libraries, frameworks and document load
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

// This context manager ensures span context is maintained across async boundaries in the browser
import { ZoneContextManager } from '@opentelemetry/context-zone';

/* Packages for exporting traces */
// SimpleSpanProcessor immediately forwards completed spans to the exporter
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

// Import the OTLP HTTP exporter for sending traces to the collector over HTTP
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// These help with logging, diagnostics, and traces
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// Defines a Resource to include metadata like service.name, required by Elastic
import { resourceFromAttributes, detectResources } from '@opentelemetry/resources';

// Experimental detector for browser environment
import { browserDetector } from '@opentelemetry/opentelemetry-browser-detector';

// Provides standard semantic keys for attributes, like service.name
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// Context Propagation across signals
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';

/* Custom dependencies */

import { TRACE_URL } from './constants';
import { WebVitalsInstrumentation } from './web-vitals.instrumentation';

// Enable OpenTelemetry debug logging to the console
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Define resource metadata for the service, used by exporters (Elastic requires service.name)
const SERVICE_NAME = 'records-ui-web';

const detectedResources = detectResources({ detectors: [browserDetector] });
let resource = resourceFromAttributes({
	[ATTR_SERVICE_NAME]: SERVICE_NAME,
	'service.version': 1,
	'deployment.environment': 'dev'
});
resource = resource.merge(detectedResources);

// Configure the OTLP exporter to talk to the collector via nginx
const exporter = new OTLPTraceExporter({
	url: TRACE_URL // nginx proxy
});

// Instantiate the trace provider and inject the resource
const provider = new WebTracerProvider({
	resource: resource,
	spanProcessors: [
		// Send each completed span through the exporter
		new SimpleSpanProcessor(exporter),
		new SimpleSpanProcessor(new ConsoleSpanExporter())
	]
});

// Register the provider with propagation and set up the async context manager for spans
provider.register({
	contextManager: new ZoneContextManager(),
	propagator: new CompositePropagator({
		propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
	  })
});

export class ClientTelemetry {
	private static instance: ClientTelemetry;
	private initialized = false;

	private constructor() {}

	// Obtain singleton instance of provider
	public static getInstance(): ClientTelemetry {
		if (!ClientTelemetry.instance) {
			ClientTelemetry.instance = new ClientTelemetry();
			ClientTelemetry.instance.start();
		}
		return ClientTelemetry.instance;
	}

	// Initializer
	public start() {
		if (!this.initialized) {
			// Enable automatic span generation for document load and user click interactions
			registerInstrumentations({
				instrumentations: [
					// Automatically tracks when the document loads
					new DocumentLoadInstrumentation(),
					getWebAutoInstrumentations({
                        '@opentelemetry/instrumentation-fetch': {
                          propagateTraceHeaderCorsUrls: /.*/,
                          clearTimingResources: true,
                          applyCustomAttributesOnSpan(span) {
                            span.setAttribute('app.synthetic_request', 'false');
                          },
                        },
                      }),
                    // User events
					new UserInteractionInstrumentation({
						eventNames: ['click'] // instrument click events only
					}),
                    // Custom Web Vitals instrumentation
                    new WebVitalsInstrumentation()
				]
			});
			console.log('Client Telemetry Initialised');
			this.initialized = true;
		}
	}
}