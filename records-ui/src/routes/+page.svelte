<script>
	import { onMount } from 'svelte';
    import { ClientTelemetry } from '$lib/telemetry/frontend.tracer';
	//import { WebVitalsInstrumentation } from '$lib/telemetry/web-vitals.instrumentation';
    import Featured from '../components/featured/featured.svelte';

    //WebVitalsInstrumentation.init();
    /*onMount(() => {
		ClientTelemetry.getInstance().start();
	});*/

</script>

<Featured/>