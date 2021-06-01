import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Styles = styled.div`

position: sticky;
top: 0;

.navbar {
    background-color: #222;
}

a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb !important;
    &:hover {
        color: white !important;
        text-decoration: none !important;   
    }
}
`

const Update = () => {

    const [update, setupdate] = useState(false)
    const [det, setdet] = useState([])

    const handleclick = () => {

        localStorage.removeItem('gid')
        window.location.reload()

    }

    useEffect(() => {

        const val = localStorage.getItem("gid").split(',')
        console.log(val)

        setdet([val[0], val[1], val[2], val[3], val[4]])

    }, [])

    return (
        <div>
            {

                det ?
                    <>

                        <Styles>
                            <Navbar expand="lg">
                                <Navbar.Brand href="/">Ozone</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">

                                        <Nav.Item>
                                            <Nav.Link>
                                                <Link to="/vaccinationlist">Vaccination List</Link>
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link>
                                                <div onClick={handleclick} >Log Out</div>
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link>
                                                <div onClick={() => { setupdate(false) }} >Go Back</div>
                                            </Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Styles >

                        {/* <p>{det[0]}</p> */}
                    
                        <p>{det[1]}</p>
                        <p>{det[2]}</p>
                        <p>{det[3]}</p>
                        
                        <img src={det[4]} ></img>
                    
                    </>

                    :
                    <p>Please wait till we get the data</p>

            }
        </div>
    )
}

export default Update


