import { React, useState } from 'react'
import Header from './Header'
import Mapbox from './react_map'
import Maplayers from './map_openlayers'

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
        <Route path="/new">
          <Mapbox />
        </Route>
        {/* <Route path="/mapnew">
          <Maplayers />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
