<script lang=ts>
	import { ClientTelemetry } from '$lib/telemetry/frontend.tracer';
    import './news.css';

    import { logs, SeverityNumber } from '@opentelemetry/api-logs';
    const logger = logs.getLogger('default', '1.0.0');

    function onSubscribeClick() {
        ClientTelemetry.getInstance().newsletterSubscriptionInstrumentation.incrementSubscriptionsCounter();
        alert('Thank you for subscribing!');
        
        logger.emit({
				severityNumber: SeverityNumber.ERROR,
				severityText: 'ERROR',
				body: 'Something bad is happening!'
			});

        throw new Error('Something bad is happening!');
    }
</script>

<div class="container">
    <p data-testid="news-label" class="no-news-label">⚠️ Unable to obtain news stories</p> 
    <button class="subscribe-btn" data-testid="subscribe-btn" 
      on:click={onSubscribeClick}>Subscribe</button> 
</div>