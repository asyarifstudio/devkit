import { EngineUtils } from "../engine-utils";
import { TAG_CLASS, TAG_PC, type TLV } from "./tlv";



function parseSingleTag(input:string,level:number):TLV {
      //manage the tag
      var tagString = input.slice(0,2);
      var tagInt = parseInt(tagString,16);
      var tagType = tagInt & 0x1F;
      var tagClass:TAG_CLASS = (tagInt & 0xC0)>>6;
      var tagPC:TAG_PC = (tagInt & 0x20)>> 5;
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
  
  
  
      var value:TLV | TLV[] | string = input.slice(0,lengthPartInt * 2);
      input = input.slice(0,lengthPartInt * 2);
  
      var totalLength = Math.floor((tagString.length + lengthPartStr.length) / 2)
  
      if(tagPC == TAG_PC.CONSTRUCTED){
          value = doParsing(value,level+1)
          value.forEach((val)=>{
              totalLength += val.totalLength;
          })
      }
      else{
          totalLength += Math.floor(value.length /2);
      }

      return {
        tag:tagString,
        class:tagClass,
        pc:tagPC,
        actualLength:lengthPartInt,
        length:lengthPartStr,
        totalLength,
        value,
        expanded:true
    }

}

function doParsing(input:string,level:number):TLV[] {
    var result:TLV[] = [];


    while(input.length > 0){
        var tlv:TLV = parseSingleTag(input,level);
        result.push(tlv);
        input = input.slice(tlv.totalLength * 2)
    }


    return result

}





export const TLVEngine = {

    parse:(input:string):TLV[] => {
        var root:TLV[]  = [] ;

        if(!input || input.length == 0) return root;

        if(!EngineUtils.isStringValidHexString(input)){
            throw Error("Invalid Hexadecimal Input")
        }

        if(!EngineUtils.isStringLengthEven(input)){
            throw Error("Invalid Hexadecimal Input Length")
        }

        root = doParsing(input,0)



        return root;
    }
}