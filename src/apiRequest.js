//optionsObj is Get/POST/Put...
const apiRequest = async (url = '', optionsObj=null, errMsg = null) => {
    try{
        console.log("Request", url)
        const response = await fetch(url,optionsObj)
        console.log("Response in api : ",response)
        if(!response.ok) throw Error("Please reload")
    }catch(err){
        errMsg = err.Message;
    }finally{
        return errMsg
    }
}

export default apiRequest