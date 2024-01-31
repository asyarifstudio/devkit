<script lang="ts">
	import { ASCIIEngine } from "$lib/engines/ascii/ascii-engine";

    var inputHex:string;
    var inputAscii:string;

    var outputHex:string;
    var outputAscii:string;

    var errorHex:string | undefined = undefined;
    var errorAscii:string | undefined = undefined;

    $:{
        try{
            errorHex= undefined
            outputHex = ASCIIEngine.hexToAscii(inputHex);
        }
        catch(e:any){
            errorHex = e.message
        }
    }
    $:{
        try{
            errorAscii = undefined;
            outputAscii = ASCIIEngine.asciiToHex(inputAscii)

        }
        catch(e:any){
            errorAscii = e.message
        }
    }
</script>
<h1 class="text-xl">ASCII Converter</h1>
<h2 class="text-sm">Convert ASCII text to hexadecimal string</h2>
<div class="divider"></div>
<div class="w-full grid grid-cols-2 gap-2">
    <div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Hex String Input</span>
                
              </div>
            <textarea class="textarea textarea-bordered roundednon w-full h-full" placeholder="Hex Input" bind:value={inputHex}></textarea>
            <div class="label">
                <span class="label-text-alt text-error" class:text-white={!errorHex}>{errorHex}</span>
                
              </div>
        </label>
        
        <label class="form-control w-full">
            <div class="label">
              <span class="label-text">ASCII Output</span>
              
            </div>
            <div class="p-2 rounded-md border text-sm">
                {#if !errorHex}
                {outputHex}
                {/if}
              </div>
        </label>
    </div>
    <div>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">ASCII Input</span>
              </div>
            <textarea class="textarea textarea-bordered roundednon w-full h-full" placeholder="Hex Input" bind:value={inputAscii}></textarea>
            <div class="label">
                <span class="label-text-alt text-error" class:text-white={!errorAscii}>{errorAscii}</span>
                
              </div>
        </label>
        
        <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Hex String Output</span>
              
            </div>
            <div class="p-2 rounded-md border text-sm">
                {#if !errorAscii}
                {outputAscii}
                {/if}
              </div>
        </label>
    </div>
</div>