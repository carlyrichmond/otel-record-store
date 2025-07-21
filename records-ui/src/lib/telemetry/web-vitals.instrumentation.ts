/* Web Vitals Frontend package*/

import { onLCP, onINP, onCLS, onTTFB, onFCP,
	type CLSMetric, type LCPMetric, type INPMetric, type TTFBMetric, type FCPMetric } from 'web-vitals';

/* OpenTelemetry JS packages */

// Instrumentation base to create a custom Instrumentation for our provider
import {
	InstrumentationBase,
	type InstrumentationConfig,
	type InstrumentationModuleDefinition
} from '@opentelemetry/instrumentation';

// Tracing API
import {
	metrics,
	type ObservableGauge,
	type Meter,
	type Attributes,
	type ObservableResult,

} from '@opentelemetry/api';

// OpenTelemetry Metrics
import {
	MeterProvider,
	PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import type { Resource } from '@opentelemetry/resources';

// Time calculator via performance component
import { hrTime } from '@opentelemetry/core';

import { METRICS_URL } from './constants';

type CWVMetric = LCPMetric | CLSMetric | INPMetric | TTFBMetric | FCPMetric;

export class WebVitalsInstrumentation extends InstrumentationBase {

	private cwvMeter: Meter;

	/* Core Web Vitals Measures */
	private lcp: ObservableGauge;
	private cls: ObservableGauge;
	private inp: ObservableGauge;
	private ttfb: ObservableGauge;
	private fcp: ObservableGauge;

	constructor(config: InstrumentationConfig, resource: Resource) {
		super('WebVitalsInstrumentation', '1.0', config);

		const myServiceMeterProvider = this.generateMeterForResource(resource);
		metrics.setGlobalMeterProvider(myServiceMeterProvider);

		this.cwvMeter = metrics.getMeter('core-web-vitals', '1.0.0');

		// Initialising CWV metric instruments
		this.lcp = this.cwvMeter.createObservableGauge('lcp', { unit: 'ms', description: 'Largest Contentful Paint' });
		this.cls = this.cwvMeter.createObservableGauge('cls', { description: 'Cumulative Layout Shift' });
		this.inp = this.cwvMeter.createObservableGauge('inp', { unit: 'ms', description: 'Interaction to Next Paint' });
		this.ttfb = this.cwvMeter.createObservableGauge('ttfb', { unit: 'ms', description: 'Time to First Byte' });
		this.fcp = this.cwvMeter.createObservableGauge('fcp', { unit: 'ms', description: 'First Contentful Paint' });
	}

	protected init(): InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | void {}

	private generateMeterForResource(resource: Resource) {
		const metricReader = new PeriodicExportingMetricReader({
			exporter: new OTLPMetricExporter({
				url: METRICS_URL
			}),
			// Default is 60000ms (60 seconds).
			// Set to 10 seconds for demo purposes only.
			exportIntervalMillis: 10000
		});

		return new MeterProvider({
			resource: resource,
			readers: [metricReader]
		});
	}

	enable() {
		// Capture Largest Contentful Paint
		onLCP(
			(metric) => {
				this.lcp.addCallback((result) => {
					this.sendMetric(metric, result);
				});
			},
			{ reportAllChanges: true }
		);

		// Capture Cumulative Layout Shift
		onCLS(
			(metric) => {
				this.cls.addCallback((result) => {
					this.sendMetric(metric, result);
				});
			},
			{ reportAllChanges: true }
		);

		// Capture Interaction to Next Paint
		onINP(
			(metric) => {
				this.inp.addCallback((result) => {
					this.sendMetric(metric, result);
				});
			},
			{ reportAllChanges: true }
		);

		// Time to First Byte
		onTTFB(
			(metric) => {
				this.ttfb.addCallback((result) => {
					this.sendMetric(metric, result);
				});
			},
			{ reportAllChanges: true }
		);

		// First Contentful Paint
		onFCP(
			(metric) => {
				this.fcp.addCallback((result) => {
					this.sendMetric(metric, result);
				});
			},
			{ reportAllChanges: true }
		);
	}

	private sendMetric(metric: CWVMetric, result: ObservableResult<Attributes>): void {
		const now = hrTime();

		const attributes = {
			startTime: now,
			'web_vital.name': metric.name,
			'web_vital.id': metric.id,
			'web_vital.navigationType': metric.navigationType,
			'web_vital.delta': metric.delta,
			'web_vital.value': metric.value,
			'web_vital.rating': metric.rating,
			// metric specific attributes
			'web_vital.entries': JSON.stringify(metric.entries)
		};

		result.observe(metric.value, attributes);
	}
}
