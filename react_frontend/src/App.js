import { React, useState } from 'react'
import Header from './Header'
import Maplayers from './map_openlayers'
import MapContainer from './Map'
import Sellerlogin from './sellerlogin'
import SellerHome from './SellerHome'
import Update from './Update'
import Vaccinationlisting from './vaccinationlist';
import Mapbox from './react_map'
import { Layout } from './components/layout';

import { Redirect } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Oxosearch from './oxosearch'


const App = () => {

  const val = localStorage.getItem("gid")
  console.log(val)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        {/* <Route exact path="/mapbox">
          <Mapbox />
        </Route> */}
        <Route exact path="/googlemap">
          <MapContainer />
        </Route>


        {/* <Route path="/seller/home">
          <SellerHome />
        </Route> */}
        <Route path="/map/:loc">
          <Maplayers />
        </Route>

        <Route path="/search">
          <Oxosearch />
        </Route>

        <Route exact path="/vaccinationlist">
          <Vaccinationlisting />
        </Route>


        <Route exact path="/seller">

          {val === null ? <Sellerlogin /> : <SellerHome />}

        </Route>

        <Route exact path="/seller/update">
          {/* {val === null ? <Sellerlogin /> : <Update />} */}
          {val === null ? <Redirect to="/seller" /> : <Update />}
        </Route>

        {/* <Route path="/mapnew">
          <Maplayers />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
