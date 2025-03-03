<script>
    import './records.css';
    import SearchBar from '../../components/search-bar/search-bar.svelte';
</script>

<div class="container">
    <SearchBar/>
    <p data-testid="no-records-label" class="no-news-label">⚠️ Unable to obtain records</p> 
</div>