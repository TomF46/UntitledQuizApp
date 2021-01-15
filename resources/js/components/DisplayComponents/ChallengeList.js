import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChallengeList = ({ challenges }) => {
    return (
        <div>
            {challenges.map((challenge) => {
                return (
                    <div key={challenge.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Challenger:</p>
                            <Link className="font-medium items-center pointer" to={`/profile/${challenge.challengerId}`}>{challenge.challengerUsername}</Link>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Recipient:</p>
                            <Link className="font-medium items-center pointer" to={`/profile/${challenge.recipientId}`}>{challenge.recipientUsername}</Link>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Quiz:</p>
                            <Link className="font-medium items-center pointer" to={`/quiz/${challenge.quizId}`}>{challenge.quizName}</Link>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Score:</p>
                            <p className="font-medium items-center">{challenge.scorePercentToBeat}%</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Status:</p>
                            <p className="font-medium items-center">{challenge.status}</p>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <div className="table vertical-centered">
                                <Link
                                    to={`/quiz/${challenge.quizId}/challenge/${challenge.id}/play`}
                                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 shadow inline-flex items-center ml-2"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="ml-1">Play</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

ChallengeList.propTypes = {
    challenges: PropTypes.array.isRequired,
};

export default ChallengeList;
