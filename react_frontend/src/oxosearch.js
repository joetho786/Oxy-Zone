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

const Oxosearch =(place) =>{
    const [sellerdetails,setsellerdetails] = useState([])
    const [selleridlookup,setselleridlookup]=useState([])
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

    return (
        <>
        <NavigationBar/>
        <Layout>
            

           <Form >
               <InputGroup hasValidation>
        <InputGroup.Prepend>
            <DropdownButton variant="secondary" id="dropdown-basic-button" title={dropdown_name}>
            <Dropdown.Item onClick={()=>setdropdown_name('Ascending')}>Ascending</Dropdown.Item>
            <Dropdown.Item onClick={()=>setdropdown_name('Descending')}>Descending</Dropdown.Item>
            <Dropdown.Item onClick={()=>setdropdown_name('Nearest first')}>Nearest first</Dropdown.Item>
            </DropdownButton>
        </InputGroup.Prepend>
        
        <Form.Control type="text" required isInvalid />
         <InputGroup.Append >
        <Button variant="primary" type='submit'>Search</Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">
            Please enter Location
        </Form.Control.Feedback>
       
        </InputGroup>
            </Form>
        </Layout>
        </>
    )
}
export default Oxosearch;