import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Logon from "./pages/logon"
import Register from "./pages/register"
import Profile from "./pages/profile"
import NewIncident from "./pages/newIncident"


export default function Router(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Logon}/>
          <Route path="/register" component={Register}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/incidents/new" component={NewIncident}/>
        </Switch>
      </BrowserRouter>
    )
}