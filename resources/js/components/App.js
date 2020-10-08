import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";

const Main = props => (
    <Switch>
        <Route exact path="/" component={Home} />
    </Switch>
);
export default Main;
