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
import QuizManagementPage from "./Quiz/Manage/Manage";
import QuizDetailPage from "./Quiz/Detail/DetailPage";
import QuizPlayPage from "./Quiz/Play/PlayPage";
import ExplorePage from "./Explore/ExplorePage";

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
                    <AuthenticatedRoute
                        path="/explore"
                        component={ExplorePage}
                    />
                    <AuthenticatedRoute
                        path="/quiz/:quizId/edit"
                        component={QuizManagementPage}
                    />
                    <AuthenticatedRoute
                        path="/quiz/:quizId/play"
                        component={QuizPlayPage}
                    />
                    <AuthenticatedRoute
                        path="/quiz/:quizId"
                        component={QuizDetailPage}
                    />
                    <AuthenticatedRoute
                        path="/quiz"
                        component={QuizManagementPage}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </div>
    </>
);
export default Main;
