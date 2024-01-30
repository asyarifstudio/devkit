export enum TAG_CLASS {
    UNIVERSAL = 0,
    APPLICATION = 1,
    CONTEXT_SPECIFIC =2 ,
    PRIVATE=3
}

export enum TAG_PC{
    PRIMITIVE =0,
    CONSTRUCTED =1
}

export interface TLV {
    tag:string,
    class:TAG_CLASS;
    pc:TAG_PC;
    length:string;
    actualLength:number;
    expanded:boolean,
    value:string | TLV[] ;
    /**
     * total length in hexadecimal
     * for example TLV 5C0101 -> 3
     */
    totalLength:number;
}
