<script lang="ts">
	import { ASCIIEngine } from "$lib/engines/ascii/ascii-engine";

    var inputHex:string;
    var inputAscii:string;

    var outputHex:string;
    var outputAscii:string;

    $:{
        try{
            outputHex = ASCIIEngine.hexToAscii(inputHex);
        }
        catch(e){

        }
    }
    $:{
        try{
            outputAscii = ASCIIEngine.asciiToHex(inputAscii)

        }
        catch(e){

        }
    }
</script>
<div class="w-full grid grid-cols-2">
    <div>
        <textarea class="textarea textarea-bordered roundednon w-full h-full" placeholder="Hex Input" bind:value={inputHex}></textarea>
        <div>
            {outputHex}
        </div>
    </div>
    <div>
        <textarea class="textarea textarea-bordered roundednon w-full h-full" placeholder="ASCII Input" bind:value={inputAscii}></textarea>
        <div>
            {outputAscii}
        </div>
    </div>
</div>