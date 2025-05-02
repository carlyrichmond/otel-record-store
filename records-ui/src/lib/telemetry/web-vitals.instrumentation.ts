/* Web Vitals Frontend package
 example based on https://www.honeycomb.io/blog/core-web-vitals-opentelemetry */

import { onLCP, onINP, onCLS, type CLSMetric, type LCPMetric, 
  type INPMetric } from 'web-vitals';

/* OpenTelemetry JS packages */

// Instrumentation base to create a custom Instrumentation for our provider
import {
	InstrumentationBase,
	type InstrumentationModuleDefinition
} from '@opentelemetry/instrumentation';

// Tracing API
import { trace, context, type Context } from '@opentelemetry/api';

// Time calculator via performance component
import { hrTime } from '@opentelemetry/core';

export class WebVitalsInstrumentation extends InstrumentationBase {

	constructor(config = {}) {
        super('WebVitalsInstrumentation', '1.0', config)
    }

	protected init(): InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | void {}

	onReport(metric: LCPMetric | CLSMetric | INPMetric, parentSpanContext: Context | undefined) {
		const now = hrTime();

		// Start the span
		const webVitalsSpan = trace
			.getTracer('web-vitals-instrumentation')
			.startSpan(metric.name, { startTime: now }, parentSpanContext);

		// Add Core Web Vital attributes
		webVitalsSpan.setAttributes({
			[`web_vital.name`]: metric.name,
			[`web_vital.id`]: metric.id,
			[`web_vital.navigationType`]: metric.navigationType,
			[`web_vital.delta`]: metric.delta,
			[`web_vital.rating`]: metric.rating,
			[`web_vital.value`]: metric.value,
			// metric specific attributes
			[`web_vital.entries`]: JSON.stringify(metric.entries)
		});

		// End the span
		webVitalsSpan.end();
	}

	enable() {

		// Create parent span
		const parentSpan = trace.getTracer('web-vitals-instrumentation').startSpan('web-vitals');
		const ctx = trace.setSpan(context.active(), parentSpan);
		parentSpan.end();

		// Capture Interaction to Next Paint
		onINP((metric) => {
			this.onReport(metric, ctx);
		},
		{ reportAllChanges: true });

		// Capture Cumulative Layout Shift
		onCLS((metric) => {
			this.onReport(metric, ctx);
		},
		{ reportAllChanges: true });

		// Capture Largest Contentful Paint
		onLCP((metric) => {
			this.onReport(metric, ctx);
		},
		{ reportAllChanges: true });
	}
}
