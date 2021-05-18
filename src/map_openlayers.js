import React, { useState, useEffect } from 'react';
import './new.css'

import { ReactBingmaps } from 'react-bingmaps';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const openGeocoder = require('node-open-geocoder')

document.getElementById('root').style['height'] = window.innerHeight + 'px';

let textInput = React.createRef();

function handleClick(event) {
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    // console.log('in')
    console.log(textInput.current.value);
    if (!(textInput.current.value == '')) {
        openGeocoder()
            .geocode(textInput.current.value)
            .end((err, res) => { console.log('lattitude: ' +  res[0].lat + ' logitude: ' + res[0].lon) })
    }
}


const Maplayers = () => {

    const AddPushPinOnClick = (location) => {
        console.log(location);
    }

    useEffect(() => {

        // openGeocoder()
        //     .geocode('135 pilkington avenue, birmingham')
        //     .end((err, res) => { console.log(res[0]) })


    }, [])



    return (
        <>
            <ReactBingmaps
                bingmapKey="Aue53CqMhv_oforhu3pP6L5EpDqyDwfwptjqrsQdfA_SLBwzPiseBuhSTuAnlB41"
                center={[13.0827, 80.2707]}
                // mapTypeId = {"canvasDark"}
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

                navigationBarMode = {"square"}

                getLocation={
                    { addHandler: "click", callback: function (loc) { console.log(loc) } }
                }

                infoboxesWithPushPins={[
                    {
                        "location": [13.0827, 80.2707],
                        "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
                        "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
                        "pushPinOption": { title: 'Pushpin Title', description: 'Pushpin' },
                        "infoboxAddHandler": { "type": "click", callback: function () { console.log('hello') } },
                        "pushPinAddHandler": { "type": "click", callback: function () { console.log('hi') } }
                    },
                    // {
                    //   ...
                    // }
                ]
                }

                navigationBarMode={"minified"}
                supportedMapTypes={["road", "canvasDark", "ariel", "canvasLight"]}
            >
            </ReactBingmaps>

            {/* <input id = 'in' ref={textInput}/>
            <button id = 'but' onClick={handleClick} /> */}

            {/* <form id = 'form' className = 'search'>
                <div id = 'inmat'>
                    <input id = 'inp' placeholder = 'Search Oxygen Donors' ref={textInput} />
                </div>
                <button id = 'butinp' tabIndex = '0' type = 'submit' aria-label = 'search' onClick = {(e) => handleClick(e)}>
                    <span id = 'span'>
                        <svg id = 'svg' focusable = 'false' viewBox = '0 0 24 24' aria-hidden = 'true' >
                            <path d = 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                        </svg>
                    </span>
                </button>
            </form> */}

            <Paper component="form"
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
            </Paper>

        </>
    )
}

export default Maplayers




