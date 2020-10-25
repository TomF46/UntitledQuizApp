import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import EditProfilePage from "./Profile/Edit/EditProfilePage";

const Main = props => (
    <>
        <Header />
        <div className="relative">
            <div className="container mx-auto">
                <Switch>
                    <AuthenticatedRoute
                        exact
                        path="/"
                        component={Dashboard}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <AuthenticatedRoute
                        path="/profile/:userId/edit"
                        component={EditProfilePage}
                    />
                    <AuthenticatedRoute
                        path="/profile/:userId"
                        component={ProfilePage}
                    />
                    <AuthenticatedRoute
                        path="/profile"
                        component={ProfilePage}
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
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default Main;
