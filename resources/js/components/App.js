import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../AuthenticatedRoute";
import Home from "./Home/Home";
import Login from "./Authentication/Login/LoginPage";
import Register from "./Authentication/Register/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import NotFound from "./NotFound/NotFoundPage";

const Main = props => (
    <div className="container mx-auto">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AuthenticatedRoute path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </div>
);
export default Main;
