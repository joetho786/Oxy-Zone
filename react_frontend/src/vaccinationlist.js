import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import axios from "axios";
import { renderToNodeStream } from 'react-dom/server';

const  Vaccinationlisting = () =>{
    const [resp,setresp]=useState()
    useEffect(()=>{
     axios
        .get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=512&date=31-03-2021')
        .then((res) => {
            setresp(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err));
         console.log(resp);
    })
return(
    <h1>koo</h1>
)

}
export default Vaccinationlisting