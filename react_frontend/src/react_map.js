import React from 'react'
import ReactMapGL from 'react-map-gl';
import './react_map.css'

document.getElementById('root').style['height'] = window.innerHeight + 'px'
console.log(window.innerHeight)

function Mapbox() {
    const [viewport, setViewport] = React.useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
        width: window.innerWidth,
        height: window.innerHeight
    });

    return (
        <ReactMapGL
            mapboxApiAccessToken = {
                "pk.eyJ1IjoibG9yZG9mdW5pdmVyc2UiLCJhIjoiY2tvdGw3ajkwMGNrYTJ4cWp4Mzh5cDBwdyJ9.DeuOLVX7a5ULR1UCGbnHrA"
            }
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
        />
    );
}

export default Mapbox