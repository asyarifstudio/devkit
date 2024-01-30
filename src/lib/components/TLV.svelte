<script lang="ts">
	import { TAG_PC, type TLV } from "$lib/engines/tlv/tlv";

    export let tlvs:TLV[];
    export let level:number;

    $:console.log(level)
</script>
<ul>
    {#each tlvs as tlv}

    {#if tlv.pc == TAG_PC.PRIMITIVE}
    <li class="ml-5">{tlv.tag} {tlv.length} {tlv.value}</li>
    {:else}
    <li class="ml-5">{tlv.tag} {tlv.length}</li>
    <li class="ml-5">
        <svelte:self tlvs={tlv.value} level={level+1}></svelte:self>
    </li>
    {/if}
    {/each}
</ul>



