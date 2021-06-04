import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {NavigationBar} from './components/Navigation';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form } from 'react-bootstrap';
import { typeOf } from 'react-is';
import {Layout} from './components/layout'
import { Component } from 'react';
import { render } from '@testing-library/react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import img from './components/cardimg.svg';
import {Clayout} from './components/cardlayout';
import {Flayout} from './components/filterosearch';
import {
    useParams
} from "react-router-dom";

let textInput = React.createRef();
const Oxosearch =() =>{
    const [place,setplace]=useState(useParams())
    const [sellerdetails,setsellerdetails] = useState([])
    //const [selleridlookup,setselleridlookup]=useState([])
    let searchresult =[];
    const [dropdown_name,setdropdown_name]=useState('Filters')
    useEffect(()=>{
       console.log(place)
        axios
        .get("/details/places/")
        .then((res) => {console.log(res.data)
        setsellerdetails(res.data)
        })
        .catch((err) => console.log(err));
       console.log(sellerdetails)
    },[])
    console.log(dropdown_name)
    console.log(sellerdetails)
    //let {place} =useParams();
    sellerdetails.forEach((e)=>{

        console.log('Works')
        if (e.location === place){
            console.log(e.location)
            let name ='';
            axios
            .post('/api/getseller/',{'id': e.foreign_seller})
            .then((res)=>{
                    name=res.data.name
                    console.log('name:'+name);
                    console.log(res.data)
                    searchresult.push({
                'name': name,
                'address':e.addr,
                'phno':e.phno,
                'oprice':e.oxyprice,
                'location':e.location
            }
            )

            })
            
        }
    })
    console.log(searchresult)
    const hist = useHistory();
    

    return (
        <>
        <NavigationBar/>
        <Layout>
            

           <Form >
               <InputGroup >
            
        <Form.Control type="text" placeholder="Enter location" ref={textInput} />
         <InputGroup.Append >
        <Button variant="primary" type='submit' onClick={(e)=>setplace( textInput.current.value)}>Search</Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">
            Please enter Location
        </Form.Control.Feedback>
       
        </InputGroup>
            </Form>
            <br/>
         <DropdownButton variant="secondary" id="dropdown-basic-button" title={dropdown_name}>
            <Dropdown.Item onClick={()=>setdropdown_name('Ascending')}>Ascending</Dropdown.Item>
            <Dropdown.Item onClick={()=>setdropdown_name('Descending')}>Descending</Dropdown.Item>
            <Dropdown.Item onClick={()=>setdropdown_name('Nearest first')}>Nearest first</Dropdown.Item>
            </DropdownButton>

        

        </Layout>
        </>
    )
}
export default Oxosearch;