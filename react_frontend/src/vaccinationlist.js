import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {NavigationBar} from './components/Navigation';
import { Form } from 'react-bootstrap';
import { typeOf } from 'react-is';
import {Layout} from './components/layout'
import { Component } from 'react';
import { render } from '@testing-library/react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import img from './components/cardimg.svg';
import {Clayout} from './components/cardlayout'
const Vaccinationlisting =() =>{
  const history = useHistory();
  const [pincode,setpincode]=useState(0)
  const [centerdata,setcenterdata]=useState([])
  // useEffect(()=>{
  
  // },[])
  // const [date,setdate]=useState('')
  // const [pincode,setpincode] =useState('')
  // const getVaccine = (event)=> {
  //       setpincode(event.target.value)
  //       var today = new Date()
  //        setdate(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
        
  //       console.log(pincode)
  //       console.log(date)
  //     // axios 
  //     // .get('')
  // }

const handleClick =(event) =>{
    event.preventDefault();
    console.log('vaue'+event.target.value)
    let url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pincode+"&date=31-03-2021"
    console.log(pincode)
        
      // console.log(textInput.current.value)
      axios
      .get(url)
      .then((res)=>{setcenterdata(res.data.sessions)
                    console.log(centerdata)})
    
}


return(
  <>
  <NavigationBar/>
  <Layout>
  <h1>Search vaccination centers</h1>
  <Form>
    <Form.Group controlId="State">
      <Form.Label class="fhead">Enter Pin Code</Form.Label>
      <Form.Control type ="number" placeholder="Pin Code" value={pincode} onChange={(e)=> setpincode(e.target.value)} >
     
           
      </Form.Control>
    </Form.Group>


    <Button variant="primary" type="submit" block onClick={(e)=> handleClick(e)} >
      Search
    </Button>
  </Form>
  
 <Clayout>
    {/* <CardDeck className="cdeck"> */}
    
      
      { centerdata.map((center,index)=>
  
  <Card key={index}>
    <Card.Img variant="top" src={img}/>
    <Card.ImgOverlay>
    <Card.Title className="text-white" >{center.name}</Card.Title>
    </Card.ImgOverlay>
    <Card.Body>
      
      <Card.Text>
        <strong>Vaccine:</strong>  {center.vaccine}
        <br/>
        {center.address},{center.district_name},{center.state_name}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
 
      )
  }
  
{/* </CardDeck> */}
 </Clayout>

</Layout>

  
 </>
)


}


export default Vaccinationlisting
