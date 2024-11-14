import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
const response =await fetch(url,config);
const resdata=await response.json()
if(!response.ok){
    throw new Error(
        resdata.message || "something went wrong"
    )
}
return resdata
}
export default function useHttp(url,config,initialData){
const [error,setError]=useState()
const [isLoading,setIsLoading]=useState(false)
const[data,setData]=useState(initialData);
const sendRequest=useCallback( async function sendRequest() {
    setIsLoading(true)
    try{
        const resdata=await sendHttpRequest(url,config);
        setData(resdata)
    }
    catch(error){
        setError(Error.message ||  "something went wrong")
    }
    setIsLoading(false)   
},[url,config])
useEffect(()=>{ if (config && (config.method==='GET' || !config.method) || !config){
    sendRequest()}
}
,[sendRequest,config])

return {data,isLoading,error,sendRequest}
}