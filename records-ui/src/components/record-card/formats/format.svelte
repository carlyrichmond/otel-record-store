<!-- Format Icons sourced from https://icon-sets.iconify.design/ -->
<script lang=ts>
	import type { format } from "../record.model";

    export let width: number;
    export let height: number;

    export let recordFormat: format;

    const color: string = "#F68FBE";
</script>

{#if recordFormat === "CD"}
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill={color}/><path fill={color} d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M256 336a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80"/></svg>
{:else if recordFormat === "LP"}
    <svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 24 24"><g fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 3.937A9 9 0 1 0 21 12"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m8-8a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="m20 4l-3.5 10l-2.5 2"/></g></svg>
{:else if recordFormat === "DD"}
<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill={color} d="M10.75 19q.95 0 1.6-.65t.65-1.6V13h3v-2h-4v3.875q-.275-.2-.587-.288t-.663-.087q-.95 0-1.6.65t-.65 1.6t.65 1.6t1.6.65M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13h5l-5-5z"/></svg>
{/if}