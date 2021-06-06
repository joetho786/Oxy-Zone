import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavigationBar from './components/Navigation';
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



const Oxosearch =({props})=>{
    const [dropdown_name,setdropdown_name]=useState('Filter');
    const [place,setplace]=useState('');
    const history=useHistory();
    const [sellerdetails,setsellerdetails]=useState([])
    const [dispdata,setdispdata] = useState([])
    //console.log(props)
    //searchplace
    const handleClick=(event)=>{
        event.preventDefault();
        getdata()
        
    }
    const location = useLocation();
    
   const getdata=()=>{
          let tlist= []
         sellerdetails.forEach((e)=>{
            console.log('lloop')
            if (e.location==place){
                axios
                .post('/api/getnamebyid/',{id:e.foreign_seller})
                .then((res)=>{

                    console.log(res.data)
                   const temp={
                        'name': res.data.name,
                        'address':e.addr,
                        'location':e.location,
                        'oxyprice':e.oxyprice

                    }
                    
                    tlist.push(temp)
                })

        }
setdispdata(tlist)
setplace('')
         return(
             
             dispdata.map((center,index)=>{
                 {console.log(center)}
                    <Card key={index}>
                <Card.Img variant="top" src={img}/>
                <Card.ImgOverlay>
                <Card.Title className="text-white" >{center.name}</Card.Title>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>
                        <strong>Address:</strong>  {center.address}
                        <br/>
                        <strong>Price/cylinder: </strong> {center.oxyprice}<br/>
                        
                    </Card.Text>
                </Card.Body>
                
                <Card.Footer>
                <small className="text-muted"></small>
                </Card.Footer>
        </Card>
             })
        )


    } )

}


    useEffect(() => {
       // result: 'some_value'
       setplace(location.state.detail)
      // console.log(place)
       axios
       .get('/details/places/')
       .then((res)=>{
           
           setsellerdetails(res.data)
          // console.log(sellerdetails)
       })
       
        // sellerdetails.forEach((e)=>{
            
        //     if (e.location==place){
        //         axios
        //         .post('/api/getnamebyid/',{id:e.foreign_seller})
        //         .then((res)=>{
                    
        //             console.log(res.data)
        //            const temp={
        //                 'name': res.data.name,
        //                 'address':e.addr,
        //                 'location':e.location,
        //                 'oxyprice':e.oxyprice

        //             }
        //            setdispdata(dispdata.concat(temp))
        //         })
        
        //             }

        // })
        
   


    }, []);
   
    return (
        <>

         <NavigationBar props = {[['Home', '/'], ['Sell Oxygen', '/seller'], ['Contact', '/contact'] ]} />
        <Layout>


           <Form >
               <InputGroup >

        <Form.Control type="text" placeholder="Enter location" value={place} onChange={(e)=>setplace(e.target.value)}/>
         <InputGroup.Append >
        <Button variant="primary" type='submit'  block onClick={(e)=>handleClick(e)}>Search</Button>
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
    <Clayout>
        
        {
           
        dispdata.map((center,index)=>{
            // {console.log(dispdata)}
            {console.log(center)}
            return(
            <div>{center.location}</div>)
        // return(
        // <Card key={index}>
        //         <Card.Img variant="top" src={img}/>
        //         <Card.ImgOverlay>
        //         <Card.Title className="text-white" >{center.name}</Card.Title>
        //         </Card.ImgOverlay>
        //         <Card.Body>
        //             <Card.Text>
        //                 <strong>Address:</strong>  {center.address}
        //                 <br/>
        //                 <strong>Price/cylinder: </strong> {center.oxyprice}<br/>
                        
        //             </Card.Text>
        //         </Card.Body>
                
        //         <Card.Footer>
        //         <small className="text-muted"></small>
        //         </Card.Footer>
        // </Card>)

         
      
        })
          }
   
        </Clayout>
    
        </Layout>
        </>
    )

}

export default Oxosearch;