import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AuthenticatedRoute from "../AuthenticatedRoute";
import AdminRoute from "../AdminRoute";
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
import ChallengesPage from "./Challenges/ChallengesPage";
import UserChallengePage from "./Challenges/UserChallengePage";
import ChallengesLeaderboardPage from "./Challenges/Leaderboard/LeaderboardPage";
import AdminPage from "./Admin/AdminPage";
import TagsAdminPage from "./Admin/TagsAdmin/TagsAdminPage";
import TagManagementPage from "./Admin/TagsAdmin/TagManagementPage";
import UsersAdminPage from "./Admin/UsersAdmin/UsersAdminPage";
import BannedPage from "./Banned";
import QuizBanPage from "./Admin/QuizAdmin/QuizBanPage";
import QuizBanListPage from "./Admin/QuizAdmin/QuizBanListPage";
import FriendsPage from "./Friends/FriendsPage";
import NotificationsPage from "./Notifications/NotificationsPage";

const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative mt-4 app-container mx-auto">
            <div className="sm:px-4 md:px-8">
                <TransitionGroup className="transition-group">
                    <CSSTransition
                        key={location.key}
                        timeout={{ enter: 200, exit: 200 }}
                        classNames={'fade'}
                    >
                        <section className="route-section">
                            <Switch location={location}>
                                <AuthenticatedRoute
                                    exact
                                    path="/"
                                    component={Dashboard}
                                />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route path="/banned" component={BannedPage} />

                                <AuthenticatedRoute
                                    path="/profile/:userId/edit"
                                    component={EditProfilePage}
                                />
                                <AuthenticatedRoute
                                    path="/profile/:userId/challenge"
                                    component={UserChallengePage}
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
                                    path="/friends"
                                    component={FriendsPage}
                                />
                                <AuthenticatedRoute
                                    path="/explore"
                                    component={ExplorePage}
                                />
                                <AuthenticatedRoute
                                    path="/challenges/leaderboard"
                                    component={ChallengesLeaderboardPage}
                                />
                                <AuthenticatedRoute
                                    path="/challenges"
                                    component={ChallengesPage}
                                />
                                <AuthenticatedRoute
                                    path="/notifications"
                                    component={NotificationsPage}
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
                                    path="/quiz/:quizId/challenge/:challengeId/play"
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
                                <AdminRoute
                                    path="/admin/tags/create"
                                    component={TagManagementPage}
                                />
                                <AdminRoute
                                    path="/admin/tags/:tagId"
                                    component={TagManagementPage}
                                />
                                <AdminRoute
                                    path="/admin/tags"
                                    component={TagsAdminPage}
                                />
                                <AdminRoute
                                    path="/admin/users"
                                    component={UsersAdminPage}
                                />
                                <AdminRoute
                                    path="/admin/bans/quizzes"
                                    component={QuizBanListPage}
                                />
                                <AdminRoute
                                    path="/admin/quiz/:quizId/ban"
                                    component={QuizBanPage}
                                />
                                <AdminRoute
                                    path="/admin"
                                    component={AdminPage}
                                />
                                <Route path="/404" component={NotFound} />
                                <Route component={NotFound} />
                            </Switch>
                        </section>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
