import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../AuthenticatedRoute";
import Home from "./Home/Home";
import Login from "./Authentication/Login/LoginPage";
import Register from "./Authentication/Register/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import NotFound from "./NotFound/NotFoundPage";
import Header from "./DisplayComponents/Header";
import ProfilePage from "./Profile/Profile";

const Main = props => (
    <>
        <Header />
        <div className="relative">
            <div className="container mx-auto">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <AuthenticatedRoute
                        path="/profile"
                        component={ProfilePage}
                    />
                    <AuthenticatedRoute
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </div>
    </>
);
export default Main;
