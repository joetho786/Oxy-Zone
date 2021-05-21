import React, { useState, useEffect } from 'react';
import './new.css'

import axios from "axios";

import { ReactBingmaps } from 'react-bingmaps';

// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

import {
    useParams
} from "react-router-dom";

const openGeocoder = require('node-open-geocoder')

document.getElementById('root').style['height'] = window.innerHeight + 'px';

let textInput = React.createRef();


const Maplayers = () => {

    const [onloadloc, setonloadloc] = useState({});
    const [title, settitle] = useState('')

    const AddPushPinOnClick = (location) => {
        console.log(location);
    }

    function handleClick(event) {
        console.log(event)
        event.preventDefault()
        event.stopPropagation()
        // console.log('in')
        console.log(textInput.current.value);
        if (!(textInput.current.value == '')) {
            openGeocoder()
                .geocode(textInput.current.value)
                .end((err, res) => {
                    console.log('res: ' + res)
                    console.log('err: ' + err)
                    if (!(res == '')) {
                        setonloadloc({ 'lat': res[0].lat, 'lon': res[0].lon })
                        settitle(textInput.current.value)
                    } else {
                        alert('Error! place not found')
                    }
                }
                )
        }
    }

    useEffect(() => {

        console.log('loc: ' + loc)

        openGeocoder()
            .geocode(loc)
            .end((err, res) => {
                console.log('res: ' + res)
                console.log('err: ' + err)
                if (!(res == '')) {
                    setonloadloc({ 'lat': res[0].lat, 'lon': res[0].lon })
                    settitle(loc)

                    axios
                        .post("/api/places/", {
                            location: loc.toString(),
                            lattitude: parseFloat(res[0].lat),
                            longitude: parseFloat(res[0].lon),
                            seller: 'vinu'
                        })
                        .then(res => console.log('result'));

                } else {
                    alert('Error! place not found')
                }
            })

    }, [])

    let { loc } = useParams();

    console.log(loc)

    const call = () => {console.log('hehe')}

    return (
        <>
            <ReactBingmaps
                bingmapKey="Aue53CqMhv_oforhu3pP6L5EpDqyDwfwptjqrsQdfA_SLBwzPiseBuhSTuAnlB41"
                center={[parseFloat(onloadloc.lat), parseFloat(onloadloc.lon)]}
                // mapTypeId = {"aerial"}
                mapTypeId = {"canvasDark"}
                // zoom = {5}
                // pushPins = {
                //     [
                //       {
                //         "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: function(){console.log('hello')} }
                //       },
                //     //   {
                //     //     ...
                //     //   }
                //     ]
                //   }

                //   infoboxes = {
                //     [
                //       {
                //         "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: function(){console.log('hi')}}
                //       },
                //     //   {
                //     //     ...
                //     //   }
                //     ]
                //   }

                // navigationBarMode={"square"}

                // infoboxesWithPushPins={[
                //     // {
                //     //     "location": [13.0827, 80.2707],
                //     //     "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
                //     //     "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
                //     //     "pushPinOption": { title: 'Pushpin Title', description: 'Pushpin' },
                //     //     "infoboxAddHandler": { "type": "click", callback: function () { console.log('hello') } },
                //     //     "pushPinAddHandler": { "type": "click", callback: function () { console.log('hi') } }
                //     // },
                //     {
                //         "location": [parseFloat(onloadloc.lat), parseFloat(onloadloc.lon)],
                //         "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
                //         "infoboxOption": { title: title, description: 'Infobox' },
                //         "pushPinOption": { title: title, description: 'Pushpin' },
                //         "infoboxAddHandler": { "type": "click", callback: function () { console.log('hello') } },
                //         "pushPinAddHandler": { "type": "click", callback: function () { console.log('hi') } }
                //     },
                // ]
                // }
                getLocation={
                    { addHandler: "click", callback: function (e) { console.log(e) } }
                }
                // navigationBarMode={"minified"}
                // supportedMapTypes={["road", "canvasDark", "ariel", "canvasLight"]}

            >
            </ReactBingmaps>


            <form id='form' className='search2'>
                <div id='inmat'>
                    <input id='inp' placeholder='Search Oxygen Donors' ref={textInput} />
                </div>
                <button id='butinp' tabIndex='0' type='submit' aria-label='search' onClick={(e) => handleClick(e)}>
                    <span id='span'>
                        <svg id='svg' focusable='false' viewBox='0 0 24 24' aria-hidden='true' >
                            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                        </svg>
                    </span>
                </button>
            </form>

            {/* <Paper component="form"
                className='search'
            >
                <InputBase
                    // className={classes.input}
                    ref={textInput}
                    placeholder="Search Oxygen Donors"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit"
                    // className={classes.iconButton}
                    onClick={(e) => handleClick}
                    aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper> */}

        </>
    )
}

export default Maplayers




