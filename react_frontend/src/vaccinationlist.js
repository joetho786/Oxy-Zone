import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import { renderToNodeStream } from 'react-dom/server';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import bg from './bg.png';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Search } from '@material-ui/icons';
import FormPage from './vaccinesearchform';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
function handlesellerClick(event,history) {
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    history.push("/seller");
}

/*const  Vaccinationlisting = () =>{
    const [resp,setresp]=useState()
    
     axios
        .get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=512&date=31-03-2021')
        .then((res) => {
            setresp(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err));
        console.log(resp);
    */

      




const Vaccinationlisting =() =>{

return(
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#">Ozone</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/seller" >Sell Oxygen</Nav.Link>
    </Nav>
  </Navbar>

 <MDBCol md="6">
      <MDBFormInline className="md-form">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
      </MDBFormInline>
    </MDBCol>
  
 </>
)

}


export default Vaccinationlisting;
