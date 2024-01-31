
import * as jsrsasign from 'jsrsasign';

export enum X509_FORMAT {
    DER="DER",
    PEM="PEM",
    BASE64="Base64"
}


export type Certificate = jsrsasign.X509


export const x509Engine = {
    parse:(input:string,format:X509_FORMAT):jsrsasign.X509=>{
        var cert = new jsrsasign.X509();
        switch(format){
            case X509_FORMAT.DER:
                break;
            case X509_FORMAT.PEM:
                cert.readCertPEM(input)
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
