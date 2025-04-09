import { onLCP, onINP, onCLS, type CLSMetric, type LCPMetric, 
  type INPMetric } from 'web-vitals';
import {
	InstrumentationBase,
	type InstrumentationModuleDefinition
} from '@opentelemetry/instrumentation';
import { trace, context, type Context } from '@opentelemetry/api';
import { hrTime } from '@opentelemetry/core';

export class WebVitalsInstrumentation extends InstrumentationBase {
	protected init(): InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | void {}

	onReport(metric: LCPMetric | CLSMetric | INPMetric, parentSpanContext: Context | undefined) {
		const now = hrTime();

		// start the span
		const webVitalsSpan = trace
			.getTracer('web-vitals-instrumentation')
			.startSpan(metric.name, { startTime: now }, parentSpanContext);

		// add core web vital attributes
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

		webVitalsSpan.end();
	}

	enable() {
		if (!this.isEnabled()) {
			return;
		}

		// Create parent span
		const parentSpan = trace.getTracer('web-vitals-instrumentation').startSpan('web-vitals');
		const ctx = trace.setSpan(context.active(), parentSpan);
		parentSpan.end();

		// Capture Interaction to Next Paint
		onINP((metric) => {
			this.onReport(metric, ctx);
		});

		// Capture Cumulative Layout Shift
		onCLS((metric) => {
			this.onReport(metric, ctx);
		});

		// Capture Largest Contentful Paint
		onLCP((metric) => {
			this.onReport(metric, ctx);
		});
	}
}
