<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	import './records.css';
	import SearchBar from '../../components/search-bar/search-bar.svelte';

	import RecordCard from '../../components/record-card/record-card.svelte';
	import Spinner from '../../components/spinner/spinner.svelte';

	
	let loading: boolean = $state(false);

	async function getRecords(query: string) {
		loading = true;

		try {
			const queryParams: string = query ? `/${query}` : '';
			const response = await fetch(`http://localhost:8080/records${queryParams}`);
			const records = await response.json();
			data = { records: records };
		} catch (e) {
			console.error(e);
			data = { error: '⚠️ Unable to obtain records' };
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<SearchBar getRecords={getRecords} />

	{#if loading}
		<Spinner/>
	{/if}

	<div class="cards-container">
		{#if data.error}
			<p data-testid="no-records-label" class="no-records-label">{data.error}</p>
		{/if}

		{#each data.records as record}
			<RecordCard record={record}/>
		{/each}
	</div>
</div>
