

export const EngineUtils = {
    isStringValidHexString:(input:string):boolean=>{
        const hexPattern = /^[0-9A-Fa-f]+$/;
        return hexPattern.test(input);
    },
    isStringLengthEven:(input:string):boolean=>{
        return input.length %2 == 0;
    }
}
