<script lang="ts">
	import Tlv from "$lib/components/TLV.svelte";
import type { TLV } from "$lib/engines/tlv/tlv";
	import { TLVEngine } from "$lib/engines/tlv/tlv-engine";

    var input:string = "BF3728BF2721800100BF2F0A800100810204F00C0130060100A20CA00A4F0500000000000401005F370100"
    var tlvs:TLV[]= [];
    var error:string = ""

    $: {
        try{
            error = ""
            tlvs = TLVEngine.parse(input);
        }
        catch(e:any){
            tlvs = [];
            error = e.message
        }
        
    }

</script>
<div>
    <textarea class="textarea textarea-bordered" placeholder="TLV Hexadecimal String" bind:value={input}></textarea>
</div>
<div>
    {#if error.length==0}
    <Tlv tlvs={tlvs} level={0}></Tlv>
    {:else}
    <div>{error}</div>
    {/if}
    
</div>