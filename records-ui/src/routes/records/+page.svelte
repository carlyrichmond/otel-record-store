<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	import './records.css';
	import SearchBar from '../../components/search-bar/search-bar.svelte';
	import RecordCard from '../../components/record-card/record-card.svelte';

	/**
	 * @type {boolean}
	 */
	let loading: boolean;

	/**
	 * @param {any} query
	 */
	async function getRecords(query = '') {
		loading = true;

		try {
			const response = await fetch(`http://localhost:8080/records/${query}`);
			data = await response.json();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<SearchBar {getRecords} />

	<div class="cards-container">
		{#if data.error}
			<p data-testid="no-records-label" class="no-records-label">{data.error}</p>
		{/if}

		{#each data.records as record}
			<RecordCard record={record}/>
		{/each}
	</div>
</div>
