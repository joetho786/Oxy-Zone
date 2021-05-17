import React from 'react'
import styled from 'styled-components';
import './header.css'
import bg from './bg.png';
import map from './map.png';
import frame from './Frame 1.png';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import { SearchIcon } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';

export const Header = () => {
    return (
        <>
            <Topbar>
                <img class='fill' src={ bg } alt='bg' />
                {/* <White/> */}
                <img class = 'over' src = { frame } alt = 'over' />
            </Topbar>
            {/* <Secondbar/> */}
            <Rowtext>
                <Textcontent>
                    <TitleHead>Welcome to O-Zone</TitleHead>
                    {/* <Texthead>Want to buy Oxygen?</Texthead> */}
                </Textcontent>
                <button type="button" class="btn btn-warning c1 c">Vaccinations list</button>
                <button type="button" class="btn btn-secondary c2 c">Sell oxygens</button>
            </Rowtext>
            <Bottom>
                <Half>
                    {/* <input id = 'search' placeholder = 'Search Oxygen' >
                    
                    </input> */}
                    <Paper component="form" 
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
                    </Paper>
                </Half>
                <Half2>
                    <MapBut>
                        <img id = 'map' src = { map }/>
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
    // position: absolute;
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
    height: 215px;
    display: flex;
    flex-direction: row;
`

export default Header
