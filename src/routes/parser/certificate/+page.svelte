<script lang="ts">
	import { X509_FORMAT, x509Engine, type Certificate, } from "$lib/engines/x509/x509-engine";

    let input:string =`-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----`;
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