<script lang="ts">
	import { TAG_PC, type TLV } from "$lib/engines/tlv/tlv";

    export let tlvs:TLV[];
    export let level:number;

    $:console.log(level)
</script>

<ul class:menu={level == 0}>
    {#each tlvs as tlv}
    <li>
        {#if tlv.pc == TAG_PC.PRIMITIVE}
        <a>{tlv.tag} {tlv.length} {tlv.value}</a>
        {:else}
        <a>{tlv.tag} {tlv.length}</a>
        <svelte:self tlvs={tlv.value} level={level+1}></svelte:self>
        {/if}
    </li>
    {/each}
</ul>

