<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/vinyl.png';

  import { onMount } from 'svelte';
	import { ClientTelemetry } from '$lib/telemetry/frontend.tracer';

	let { children } = $props();

  onMount(() => {
		ClientTelemetry.getInstance().start();
	});
</script>

<header>
    <a class="company-header" href="/">
		<img src={logo} class="logo" alt="vinyl record"/>
		<h1 class="app-header" data-testid="company-header">
        OTel Records 
      </h1>
    </a>
  </header>
  <nav>
    <ul class="nav-bar">
      <li>
        <a href="/records">Records</a>
      </li>
      <li>
        <a href="/events">Events</a>
      </li>
      <li>
        <a href="/news">News</a>
      </li>
    </ul>
  </nav>
  <section>
    
	{@render children()}

  </section>
  <footer>
    Made by Carly Richmond with 💜 and excessive amounts of 🍵
  </footer>