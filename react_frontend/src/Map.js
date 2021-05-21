import React, { Component } from 'react'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14} initialCenter={{
                lat: 11.378250,
                lng: 77.896927
            }}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        {/* <h1>{this.state.selectedPlace.name}</h1> */}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}


// const Mapjs = ({props}) => {
//     return (
//         <Map google={props.google} zoom={14}>

//             <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />

//             <InfoWindow onClose={this.onInfoWindowClose}>
//                 <div>
//                     <h1>{this.state.selectedPlace.name}</h1>
//                 </div>
//             </InfoWindow>
//         </Map>
//     )
// }

export default GoogleApiWrapper({
    // apiKey: ('AIzaSyB0HAY8Uhw2YGFwBg78jlQuhahMxV1TtaQ')
    apiKey: ('AIzaSyA1Y2jg6I4bfdp1T1vPPF6pV5Sf3HsXEnw')
})(MapContainer)
