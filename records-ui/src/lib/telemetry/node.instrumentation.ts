import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import {
    AlwaysOnSampler,
} from '@opentelemetry/sdk-trace-base';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { METRICS_URL, TRACE_URL } from './constants';

const SERVICE_NAME = 'records-ui';

const exporter = new OTLPTraceExporter({
    url: TRACE_URL,
    headers: {
        'Authorization': `ApiKey ${process.env.ELASTIC_API_KEY}`
    }
});

const otelNodeSdk = new NodeSDK({
    autoDetectResources: true,
    serviceName: SERVICE_NAME,
    traceExporter: exporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: METRICS_URL,
            headers: {}
        })
    }),
    sampler: new AlwaysOnSampler(),
    resource: resourceFromAttributes(({
        [ATTR_SERVICE_NAME]: SERVICE_NAME
    })),
    instrumentations: [
        getNodeAutoInstrumentations({
            // load custom configuration for http instrumentation
            '@opentelemetry/instrumentation-http': {
                applyCustomAttributesOnSpan: (span) => {
                    span.setAttribute('ssr', true);
                }
            }
        })
    ]
});
export class Telemetry {
    private static instance: Telemetry;
    private initialized = false;

    private constructor() {}

    public static getInstance(): Telemetry {
        if (!Telemetry.instance) {
            Telemetry.instance = new Telemetry();
            Telemetry.instance.start();
        }
        return Telemetry.instance;
    }

    public start() {
        if (!this.initialized) {
            this.initialized = true;
            otelNodeSdk.start();
        }
    }
}