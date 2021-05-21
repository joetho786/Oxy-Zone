import React, { useEffect } from 'react'
import styled from 'styled-components';
import './header.css'
import bg from './bg.png';
import map from './map.png';
import frame from './Frame 1.png';
import axios from "axios";

import { useHistory } from "react-router-dom";

// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

let textInput = React.createRef();

function handleClick(event, hist) {
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    if (!(textInput.current.value == '')) {
        console.log('urs: ')
        console.log(textInput.current.value)
        hist.push("/map/" + textInput.current.value);
    }
}

function handlesellerClick(event, hist) {
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    hist.push("/seller");
}


export const Header = () => {

    const history = useHistory();

    useEffect(() => {
        
        axios
        .get("/api/seller/")
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

        axios
        .get("/api/places/")
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

    }, [])


    return (
        <>
            <Topbar>
                <img class='fill' src={bg} alt='bg' />
                {/* <White/> */}
                <img class='over' src={frame} alt='over' />
            </Topbar>
            {/* <Secondbar/> */}
            <Rowtext>
                <Textcontent>
                    <TitleHead>Welcome to O-Zone</TitleHead>
                    {/* <Texthead>Want to buy Oxygen?</Texthead> */}
                </Textcontent>
                <button type="button" class="btn btn-warning c1 c">Vaccinations list</button>
                <button type="button" class="btn btn-secondary c2 c" onClick = {(e) => handlesellerClick(e, history)}>Sell oxygens</button>
            </Rowtext>
            <Bottom>
                <Half>
                    {/* <input id = 'search' placeholder = 'Search Oxygen' >
                    
                    </input> */}
                    {/* <Paper component="form" 
                    className= 'search'
                    >
                        <InputBase
                            // className={classes.input}
                            placeholder="Search Oxygen Donors"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" 
                        // className={classes.iconButton}
                         aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper> */}

                    <form id='form' className='search'>
                        <div id='inmat'>
                            <input id='inp' placeholder='Search Oxygen Donors' ref={textInput} />
                        </div>
                        <button id='butinp' tabIndex='0' type='submit' aria-label='search' onClick={(e) => handleClick(e, history)}>
                            <span id='span'>
                                <svg id='svg' focusable='false' viewBox='0 0 24 24' aria-hidden='true' >
                                    <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                                </svg>
                            </span>
                        </button>
                    </form>

                </Half>
                <Half2>
                    <MapBut>
                        <img id='map' src={map} />
                    </MapBut>
                </Half2>
            </Bottom>
        </>
    )
}

const White = styled.div`
height: 20%;
background-color: white;
position: absolute;
bottom: 0;
width: 100%;
clip-path: polygon(0% 100%, 99% 99%, 100% 9%, 92% 5%, 82% 1%, 74% 0%, 63% 3%, 53% 11%);
`

const MapBut = styled.div`
width: 315px;
height: 215px;
overflow: hidden;
transform: rotate(357.86deg);
`

const Half = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Half2 = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Topbar = styled.div`
    position: absolute;  
    width: 100%;  
    height: 58%;
    // background-color: #009EFA;
    // object-fit: cover;
    display: flex;
    // background-image: url(/static/media/bg.9e4d8dd5.png);
    z-index: 0;

`

const Secondbar = styled.div`
    height: 300px;
    background-color: #009EFA;
    display: flex;
    clip-path: polygon(0 0, 100% 0, 100% 67%, 0 100%);
`

const Rowtext = styled.div`
    position: absolute;
    height: 58%;
    display: flex;
    flex-direction: row;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
`

const TitleHead = styled.div`
height: 100%;
width: 100%;
font-size: 50px;
color: #97E434;
display: flex;
justify-content: flex-start;
align-items: center;
margin-left: 50px;
z-index: 2;
`

const Textcontent = styled.div`
    // position: absolute;
    height: 500px;
    width: 80%;
    display: flex;
    flex-direction: column;
    z-index: 3;
`

const Texthead = styled.div`
    height: 00px;
    width: 100%;
    font-size: 30px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button1 = styled.div`
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    background-color: #0AE477;
    border: 1px solid #0AE477;
    margin-top: 10px;

    &:hover {
        background-color: white;
        color: black;
    }
`

const Button2 = styled.div`
    width: 120px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    background-color: #0AE477;
    border: 1px solid #0AE477;
    margin-left: 10px;
    margin-top: 10px;

    &:hover {
        background-color: white;
        color: black;
    }
`

const Bottom = styled.div`
    width: 100%;
    position: absolute;
    height: 42%;
    top: 58%;
    display: flex;
    flex-direction: row;
`

export default Header
