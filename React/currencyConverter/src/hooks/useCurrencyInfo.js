import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
const [data, setData] = useState({});
// If no value, then operation will be done on empty object and system doesn't crash. So, empty object will be kept.

    useEffect(()=>{
        let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        fetch(url)
        .then((res) => res.json()) //Convert the string obtained from API to JSON format
        .then((res) => setData(res[currency]))
    }, [currency])
    return data
} 
 
export default useCurrencyInfo; 