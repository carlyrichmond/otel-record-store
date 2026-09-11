<script lang="ts">
	import '../app.css';
	import logo from '$lib/assets/vinyl.png';

  import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { ClientTelemetry } from '$lib/telemetry/frontend.tracer';

	let { children } = $props();

  onMount(() => {
		ClientTelemetry.getInstance();
	});
</script>

<header>
    <a class="company-header" href={resolve('/')}>
		<img src={logo} class="logo" alt="vinyl record"/>
		<h1 class="app-header" data-testid="company-header">
        OTel Records 
      </h1>
    </a>
  </header>
  <nav>
    <ul class="nav-bar">
      <li>
        <a href={resolve('/records')}>Records</a>
      </li>
      <li>
        <a href={resolve('/events')}>Events</a>
      </li>
      <li>
        <a href={resolve('/news')}>News</a>
      </li>
    </ul>
  </nav>
  <section>
    
	{@render children()}

  </section>
  <footer>
    Made by Carly Richmond with 💜 and excessive amounts of 🍵
  </footer>