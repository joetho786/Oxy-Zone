import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import NavigationBar from './components/Navigation';
import { Form } from 'react-bootstrap';
import { typeOf } from 'react-is';
import {Layout} from './components/layout'
import { Component } from 'react';
import { render } from '@testing-library/react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import img from './components/cardimg.svg';
import {Clayout} from './components/cardlayout'
import styled from 'styled-components';


const Styles = styled.div`

.rounded-circle{

    width: 3rem;
}

`;

const Contact =()=>{

    return (
        <>
       <NavigationBar props = {[['Home', '/'], ['Sell Oxygen', '/seller'], ['Vaccination listing', '/vaccinationlist'] ]} />
        <Layout>
            <h1>About</h1>
           <p> Ozone is a simple open source initiative started to tackle the oxygen crisis in India. Ozone is a common stage for Oxygen sellers and oxygen seekers to meet. This initiative is far from over. It can be a success only if everyone contributes and uses this site.</p>
           <p>So share this websites with your contacts and make sure that it reaches both oxygen sellers and patients.</p>

<h1>Contributors</h1>
 
    This website is built with love by:
        <ul>
          <li><a href="https://github.com/LordofUniverse/">Vinu Rakhav</a></li>
          <li><a href="https://github.com/joetho786">Joel Thomas</a></li>
        </ul>
    <h3>For reporting any issues mail @:</h3>
    <ul>
      <li>
        joetho7662.0@gmail.com
      </li>
      <li>
        vinurakhav
      </li>
    </ul>
   
</Layout>

</>
    )
}
export default Contact;