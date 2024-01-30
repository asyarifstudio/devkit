import { TAG_PC, type TLV } from "./tlv";

/**
 * check if input contains only hexadecimal value
 * @param input 
 */
function checkInput(input:string):boolean{
    const hexPattern = /^[0-9A-Fa-f]*[0-9A-Fa-f]$/;
    return hexPattern.test(input);
}


function doParsing(input:string):TLV {

    //manage the tag
    var tagString = input.slice(0,2);
    var tagInt = parseInt(tagString,16);
    var tagType = tagInt & 0x1F;
    var tagClass = tagInt & 0xC0;
    var tagPC:TAG_PC = tagInt & 0x20;
    if(tagType == 0x1F){
        var tagLength = 2;
        var startIndex = 2;
        var nextTagStr = input.slice(startIndex,startIndex+2);
        var nextTagInt = parseInt(nextTagStr,16)
        
        while((nextTagInt & 0x80) == 0x80){
            tagLength += 1;
            startIndex +=2;
            nextTagStr = input.slice(startIndex,startIndex+2);
            nextTagInt = parseInt(nextTagStr,16)
        }

        tagString = input.slice(0,tagLength *2);
    }

    //manage the length;
    input = input.slice(tagString.length);

    var lengthPartStr = input.slice(0,2);
    var lengthPartInt = parseInt(lengthPartStr,16)

    if((lengthPartInt & 0x80) == 0x80){
        var numberOfOctets = lengthPartInt & 0x7F;
        lengthPartStr = input.slice(0, (numberOfOctets + 1) * 2);
        lengthPartInt = parseInt(lengthPartStr.slice(2),16);
    }


    //manage the value
    input = input.slice(lengthPartStr.length);


    var value:TLV | string;
    if(tagPC == TAG_PC.CONSTRUCTED){
        value = doParsing(input)
    }
    else{
        value = input;
    }

    return {
        tag:tagString,
        class:tagClass,
        pc:tagPC,
        actualLength:lengthPartInt,
        length:lengthPartStr,
        value
    }

}





export const TLVEngine = {

    parse:(input:string):TLV | undefined => {
        var root:TLV | undefined = undefined ;

        if(!checkInput(input)){
            throw Error("Invalid Hexadecimal Input")
        }

        root = doParsing(input)



        return root;
    }
}