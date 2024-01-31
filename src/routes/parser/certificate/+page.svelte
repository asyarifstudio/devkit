<script lang="ts">
	import { X509_FORMAT, x509Engine, type Certificate, } from "$lib/engines/x509/x509-engine";

    let input:string =``;
    let format:X509_FORMAT=X509_FORMAT.PEM
    let error:string | undefined = undefined
    var cert:Certificate | undefined = undefined;
    var notBefore:Date;
    var notAfter:Date;
    $:{
        try{
            cert = x509Engine.parse(input,format);
            notBefore = new Date(cert.getNotBefore().replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/, '20$1-$2-$3T$4:$5:$6Z'));
            notAfter = new Date(cert.getNotAfter().replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/, '20$1-$2-$3T$4:$5:$6Z'));
            console.log(cert)
        }
        catch(e){
            console.log(e)
        }
       
    }
    


</script>

<h1 class="text-xl">X.509 Certificate</h1>
<h2 class="text-sm">Parse and convert X.509 digital certificate</h2>
<div class="divider"></div>
<div class="grid grid-cols-2 gap-2">
    <div>
        <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Input</span>
              
              <span class="label-text-alt">
                <select class="select select-xs" bind:value={format}>
                    <option value={X509_FORMAT.PEM}>{X509_FORMAT.PEM}</option>
                    <option value={X509_FORMAT.DER}>{X509_FORMAT.DER}</option>
                    <option value={X509_FORMAT.BASE64}>{X509_FORMAT.BASE64}</option>
                   
                  </select>
              </span>
         
              
            </div>
            <textarea class="textarea textarea-bordered w-full h-full leading-normal tracking" rows="20" bind:value={input}></textarea>
          </label>
        
    </div>
    <div>
        <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Result</span>
              
             
         
              
            </div>
            <div class="border rounded-md p-2 mt-1 leading-normal text-sm">
                {#if cert}
                <div>Version: {cert.getVersion()}</div>
                <div>Serial Number : {cert.getSerialNumberHex()}</div>
                <div>Algorithm: {cert.getSignatureAlgorithmField()}</div>
                <div>Validity</div>
                <div class="ml-5">
                    <div>Not Before : {notBefore} </div>
                    <div>Not After : {notAfter} </div>
                </div>
                <div>Issuer</div>
                <div class="ml-5">
                    {#each cert.getIssuer().array as a}
                    <div>{a[0].type}: {a[0].value}</div>                        
                    {/each}
                </div>
                <div>Subject</div>
                <div class="ml-5">
                    {#each cert.getSubject().array as a}
                    <div>{a[0].type}: {a[0].value}</div>                        
                    {/each}
                </div>
                
                {/if}
            </div>
          </label>
    </div>

</div>