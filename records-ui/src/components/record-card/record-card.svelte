<script lang=ts>
	import Format from './formats/format.svelte';
    import './record-card.css';


    /*import vinyl from '$lib/assets/vinyl-format.png';
    import cd from '$lib/assets/cd.svg';
    import file from '$lib/assets/file.png';*/

    import type { Record } from './record.model';
    
    export let record: Record;
    
</script>

<div class="record-card" data-testid="record-card">
    <img src={record.imagePath} alt="Record"/>
    <div class="record-details">
        <h2>{record.title}</h2>
        <h3>{record.artist}</h3>
        <div class="available-formats">
        <p class="available-formats-label">Available formats</p>
            <div data-testid="format-icon-collection" class="format-icons">
              {#if record.formats.length === 0}
                <p class="no-formats-available-label">N/A</p>
              {/if}
              
              {#each record.formats as format }
                <Format width={20} height={20} recordFormat={format}/>
                <!--<enhanced:img class="format-icon" src={formatIconMap[format]} alt={format}/> -->
              {/each}
            </div>
        </div>
    </div>
</div>