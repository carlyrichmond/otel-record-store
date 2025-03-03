<script>
    import './search-bar.css';
    import search from '$lib/assets/search-icon.png';
    
    let query = '';

	/**
	 * @type {NodeJS.Timeout}
	 */
    let timer;

    const searchRecords = (/** @type {string} */ v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			query = v;
		}, 750);

        alert(`Current query ${query}`);
    }
</script>

<div class="search-container">
    <img src={search} class="search-icon" alt="vinyl record"/>
    <input bind:value={query} type="search" placeholder="Browse our record selection today!" 
    aria-label="Search record selection" on:keyup={({ target: { value } }) => searchRecords(value)}/>
  </div>