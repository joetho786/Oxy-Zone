import { React, useState } from 'react'
import Header from './Header'
import Mapbox from './react_map'
import Maplayers from './map_openlayers'
import MapContainer from './Map'
import Sellerlogin from './sellerlogin'
import Vaccinationlisting from './vaccinationlist'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route path="/map/:loc">
          <Maplayers />
        </Route>
        <Route path="/mapbox">
          <Mapbox />
        </Route>
        <Route path="/googlemap">
          <MapContainer />
        </Route>
        <Route path="/seller">
          <Sellerlogin />
        </Route>
        <Route path="/vaccinationlist">
          <Vaccinationlisting/>
        </Route>
        {/* <Route path="/mapnew">
          <Maplayers />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
