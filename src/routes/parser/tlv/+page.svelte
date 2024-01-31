<script lang="ts">
	import Tlv from "$lib/components/TLV.svelte";
import type { TLV } from "$lib/engines/tlv/tlv";
	import { TLVEngine } from "$lib/engines/tlv/tlv-engine";

    var input:string = ""
    var tlvs:TLV[]= [];
    var error:string | undefined = undefined

    $: {
        try{
            error = undefined
            tlvs = TLVEngine.parse(input);
        }
        catch(e:any){
            tlvs = [];
            error = e.message
        }
        
    }

</script>
<h1 class="text-xl">BER TLV Parser</h1>
<h2 class="text-sm">Parse TLV hex string into more readable format</h2>
<div class="divider"></div>
<div class="grid grid-cols-2 gap-2">
    <div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">TLV Hex string</span>
              </div>
            <textarea class="textarea textarea-bordered w-full h-full" placeholder="TLV Hexadecimal String" bind:value={input}></textarea>
            <div class="label">
                {#if error}
                <span class="label-text-alt text-error">{error}</span>
                {/if}
                
              </div>
        </label>
        
    </div>
    <div>
        <label class="form-control w-full">
            <div class="label">
              <span class="label-text">TLV Structure</span>
            </div>
            {#if !error}
            <div class="rounded-md border p-2 text-sm">

                <Tlv tlvs={tlvs} level={0}></Tlv>
            </div>
            {/if}
        </label>
       
        
    </div>
</div>
