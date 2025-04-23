<script lang="ts">
	import './featured.css';

	import RecordCard from '../record-card/record-card.svelte';
	import type { Record } from '../record-card/record.model';
	import { onMount } from 'svelte';

	let records: Record[] = [];

	onMount(async () => {
		try {
			const response = await fetch(`http://localhost:8080/records/featured`);
			records = await response.json();
		} catch (e) {
			console.error(e);
			return [];
		}
	});
</script>

<div class="container">
	<h2 class="featured-h2">Featured</h2>

	{#if records.length === 0}
		<p data-testid="no-featured-label" class="no-featured-label">⚠️ Unable to obtain records</p>
	{/if}
	<div class="cards-container">
		{#each records as record}
			<RecordCard {record} />
		{/each}
	</div>

	<a data-testid="browse-records-btn" class="records-btn" href="/records">Browse our selection today!</a>
</div>
