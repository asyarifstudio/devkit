
import * as forge from 'node-forge';

export enum X509_FORMAT {
    DER="DER",
    PEM="PEM",
    BASE64="Base64"
}




export const x509Engine = {
    parse:(input:string,format:X509_FORMAT):forge.pki.Certificate=>{
        var cert;
        var publicKey;
        switch(format){
            case X509_FORMAT.DER:
                break;
            case X509_FORMAT.PEM:
                cert = forge.pki.certificateFromPem(input);
                break;
            case X509_FORMAT.BASE64:
                break
        }
        if(!cert){
            throw Error("Unable to parse the certificate")
        }
        return cert
    }

   
}
