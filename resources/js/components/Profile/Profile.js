import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScoresForUser, getUserById } from "../../api/userApi";
import ScoresTable from "../DisplayComponents/ScoresTable";
import QuizList from "../DisplayComponents/QuizList";

const ProfilePage = ({ userId,history, ...props }) => {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        if(!user) {
            getUserById(userId).then(userData => {
                setUser(userData);
                getUserScores(userData.profile.id);
            }).catch(error => {
                console.log("Error getting user " + error);
            });
        }
    }, [userId, user])

    function getUserScores(id){
        getScoresForUser(id).then(scoreData => {
            console.log(scoreData);
            setScores(scoreData);
        }).catch(error => {
            console.log("Error getting user " + error);
        });
    }

    return (
        <div className="profile-page mt-8">
            {user == null ? (
                <p>...Loading profile</p>
            ) : (
                <>
                <div>
                    <h2 className="font-bold text-4xl my-4 text-center pageHeader">
                        {user.profile.username}
                    </h2>
                    <p className="text-center">{user.profile.email}</p>
                </div>
                <div>
                    <h3 className="font-bold text-xl text-center">
                        Created quizzes
                    </h3>
                    {user.quizzes.length > 0 ? (
                        <QuizList quizzes={user.quizzes} />
                    ) : (
                        <p className="text-center">Use has not created any quizzes</p>
                    )}
                </div>
                <div className="my-4">
                    <h3 className="font-bold text-xl text-center">
                        Scores
                    </h3>
                    {!scores ? (
                        <p>... Loading scores</p>
                    ) : (
                        <ScoresTable scores={scores} />
                    )}
                </div>
                </>
            )}
        </div>
    );
};

ProfilePage.propTypes = {
    userId: PropTypes.any,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId ? ownProps.match.params.userId : state.tokens.user_id;
    return {
        userIsAuthenticated: state.tokens != null,
        userId
    };
};

export default connect(mapStateToProps)(ProfilePage);
