import { EngineUtils } from "../engine-utils"

export const ASCIIEngine = {
    hexToAscii:(input:string):string=>{
        if(!input || input.length==0) return ""

        if(!EngineUtils.isStringValidHexString(input)){
            throw Error("Invalid Hexadecimal String");
        }
        if(!EngineUtils.isStringLengthEven(input)){
            throw Error("Invalid Hexadecimal String Length");
        }

       

        const hexArray = input.match(/.{1,2}/g) || [];


        const asciiString = hexArray.map(hex => String.fromCharCode(parseInt(hex, 16))).join('');

        return asciiString;

    },
    asciiToHex:(input:string):string=>{

        if(!input || input.length==0) return ""

        return input
        .split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('').toUpperCase();
    }
}