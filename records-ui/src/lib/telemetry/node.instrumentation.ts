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

const TRACE_URL = 'https://otel-record-store-b48988.ingest.eu-west-1.aws.elastic.cloud:443/v1/traces';
const METRICS_URL = 'https://otel-record-store-b48988.ingest.eu-west-1.aws.elastic.cloud:443/v1/metrics';
const SERVICE_NAME = 'records-ui-backend';

const exporter = new OTLPTraceExporter({
    url: TRACE_URL,
    headers: {
        'Authorization': 'ApiKey Zy00ckFaWUJlYjhDdS1XZG12SEE6NjEzSTBvbE4zU3ZrMXpfSlJOajlBQQ=='
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
                    span.setAttribute('foo2', 'bar2');
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
        }
        return Telemetry.instance;
    }

    public start() {
        if (!this.initialized) {
            this.initialized = true;
            //otelNodeSdk.start();
        }
    }
}