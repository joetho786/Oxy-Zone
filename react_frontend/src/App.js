import { React, useState } from 'react'
import Header from './Header'
import Mapbox from './react_map'
import Maplayers from './map_openlayers'
import MapContainer from './Map'
import Sellerlogin from './sellerlogin'
import SellerHome from './SellerHome'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  const val = localStorage.getItem("det")
  console.log(val)
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/mapbox">
          <Mapbox />
        </Route>
        <Route exact path="/googlemap">
          <MapContainer />
        </Route>
        <Route exact path="/seller">
          
          {val === null ? <Sellerlogin /> : <SellerHome /> }
        
        </Route>
        {/* <Route path="/seller/home">
          <SellerHome />
        </Route> */}
        <Route path="/map/:loc">
          <Maplayers />
        </Route>
        {/* <Route path="/mapnew">
          <Maplayers />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
