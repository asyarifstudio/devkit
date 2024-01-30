<script lang="ts">
	import type { TLV } from "$lib/engines/tlv/tlv";
	import { TLVEngine } from "$lib/engines/tlv/tlv-engine";

    var input:string = ""
    var tlv:TLV | undefined = undefined;
    var error:string = ""

    $: {
        try{
            error = ""
            tlv = TLVEngine.parse(input);
        }
        catch(e:any){
            tlv = undefined;
            error = e.message
        }
        
    }

</script>
<div>
    <textarea class="textarea textarea-bordered" placeholder="TLV Hexadecimal String" bind:value={input}></textarea>
</div>
<div>
    {#if tlv}
    <ul class="menu">
        <li>
            <a>{tlv.tag} {tlv.length}</a>
            <ul>
                <li><a>{tlv.value}</a></li>
            </ul>
        </li>
    </ul>
    {/if}
    
</div>