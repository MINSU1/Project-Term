module.exports = function validatePhoneNumber(num){
    num = num.replace(/((-)|(\()|(\))|( )|(\.))/g, "");
    
    if(!(/^[0-9]+$/).test(num)){
       return false;
    }
    
    //(/^[1-9][a-Z]+[5-8]$/).test(str);
    
    if(num.length !== 10){
        return false;
    }
    
    return num;
}