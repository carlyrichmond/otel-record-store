<script lang=ts>
    import './news.css';

    function onSubscribeClick() {
        alert('Thank you for subscribing!');
        throw new Error('Something bad is happening!');
    }
</script>

<div class="container">
    <p data-testid="news-label" class="no-news-label">⚠️ Unable to obtain news stories</p> 
    <button class="subscribe-btn" data-testid="subscribe-btn" 
      on:click={onSubscribeClick}>Subscribe</button> 
</div>