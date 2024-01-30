<script lang="ts">
	import { TAG_PC, type TLV } from "$lib/engines/tlv/tlv";
    import { ChevronRight,ChevronDown } from 'lucide-svelte';
    export let tlvs:TLV[];
    export let level:number;

    $:console.log(level)

    function expand(tlv:TLV){
        tlv.expanded = !tlv.expanded;
        tlvs = [...tlvs]
    }
</script>
<ul>
    {#each tlvs as tlv}

    {#if tlv.pc == TAG_PC.PRIMITIVE}
    <li class="ml-9 text-sm">{tlv.tag} {tlv.length} {tlv.value}</li>
    {:else}
    <li class="ml-5 flex text-sm items-center">
        <div on:click={()=>expand(tlv)}>
            {#if !tlv.expanded}
    
            <ChevronRight size=16 class="hover:cursor-pointer" /> 
            {:else}
            <ChevronDown size=16 class="hover:cursor-pointer" /> 
            {/if}
        </div>
        {tlv.tag} {tlv.length}</li>
    {#if tlv.expanded}
    <li class="ml-5 text-sm">
        <svelte:self tlvs={tlv.value} level={level+1}></svelte:self>
    </li>
    {/if}
   
    {/if}
    {/each}
</ul>



