// Example counter to track newsletter subscriptions via OTel counter

/* OpenTelemetry JS packages */

// Instrumentation base to create a custom Instrumentation for our provider
import {
	InstrumentationBase,
	type InstrumentationConfig,
	type InstrumentationModuleDefinition
} from '@opentelemetry/instrumentation';

// Metrics API
import {
	metrics,
	type Counter,
} from '@opentelemetry/api';

export class SubscriptionsCounterInstrumentation extends InstrumentationBase {

	private subscriptionsCounter: Counter;

	constructor(config: InstrumentationConfig) {
		super('SubscriptionsCounterInstrumentation', '1.0', config);

		this.subscriptionsCounter = metrics
			.getMeter('otel.records.subscriptions', '1.0.0')
			.createCounter('newsletter.subscriptions', { description: 'Number of newsletter subscriptions' });
	}

	protected init(): InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | void {}

	enable() { }

	public incrementSubscriptionsCounter(): void {
		this.subscriptionsCounter.add(1, { 'subscription.type': 'newsletter' });
	}
}
