<script lang=ts>
    import './search-bar.css';
    import search from '$lib/assets/search-icon.png';
    
    let query = '';
    export let getRecords = (_query: string) => {};

    let timer: NodeJS.Timeout;

    const searchRecords = (event: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			getRecords(query);
		}, 750);
    }
</script>

<div class="search-container">
    <img src={search} class="search-icon" alt="vinyl record"/>
    <input bind:value={query} type="search" placeholder="Browse our record selection today!" 
    data-testid="search-bar" aria-label="Search record selection" 
    on:input={searchRecords}/>
  </div>