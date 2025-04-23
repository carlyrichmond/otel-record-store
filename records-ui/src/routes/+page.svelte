<script>
    import Featured from '../components/featured/featured.svelte';

    // RUM Initialisation
    import { init as initApm } from '@elastic/apm-rum'
    
    const apm = initApm({
        serviceName: 'rum-records-ui',
        serverUrl: 'https://50bdcd88eee64c8a9f4cd27bcba2aa14.apm.eu-west-2.aws.cloud.es.io:443',
        distributedTracingOrigins: ['http://localhost:8080'],
        serviceVersion: '1.0.0',
        environment: 'dev'
});
    

</script>

<Featured/>