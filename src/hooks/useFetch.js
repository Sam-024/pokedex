import axios from "axios"
import { useState } from "react"

const useFetch = () => {
    const [response, setResponse] = useState()

    const getData = (url) => { 
        axios
        .get(url)
        .then((res) => setResponse(res.data))
        .catch((err) => console.error(err));
     };
     const getTypeData = (url) => { 
        axios
        .get(url)
        .then(res => {
            const obj ={
                results: res.data.pokemon.map(item => item.pokemon)
            }
            setResponse(obj)
        })
        .catch(err => console.error(err))
      }
     return [response, getData, getTypeData]
  
}

export default useFetch