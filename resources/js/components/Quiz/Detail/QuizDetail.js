import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScoresTableWithPagination from "../../DisplayComponents/ScoresTableWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import LikeControls from "../../DisplayComponents/LikeControls";

const QuizDetail = ({ quiz, scoresPaginator, onScoresPageChange, onLikesUpdated }) => {
    return (
        <div className="grid grid-cols-12 pb-4">
            <div className="col-span-3 px-4">
                <div className="p-4 flex justify-center items-center">
                    <LikeControls quiz={quiz} onLikesUpdated={onLikesUpdated} />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-center">Description</h3>
                    <p className="text-center">{quiz.description}</p>
                    {quiz.tags && quiz.tags.length > 0 && (
                        <div className="mt-2">
                            <h3 className="text-lg font-bold text-center">Tags</h3>
                            <ul className="tagList text-center my-4">
                                {quiz.tags.map((tag) => {
                                    return (
                                        <li className="rounded-full py-1 px-4 bg-gray-800 hover:bg-gray-600 my-1 text-white shadow" key={tag.id}>{tag.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <Link
                    to={`/quiz/${quiz.id}/play`}
                    className="border border-gray-800 text-gray-800 text-center rounded container py-2 px-4 my-4 hover:bg-gray-600 shadow inline-flex items-center justify-center"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-1">Play</p>
                </Link>
                <div>
                    <h3 className="text-lg font-bold text-center mb-4">Creator</h3>
                    <img src={quiz.creator.profile_image} alt="profile-picture" className="rounded-full h-24 w-24 centered" />
                    <p className="text-center my-4">{quiz.creator.username}</p>
                    <div className="flex flex-col justify-center">
                        <Link to={`/profile/${quiz.creator.id}`} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-gray-600 hover:text-white shadow">View profile</Link>
                    </div>

                </div>
            </div>
            <div className="col-span-9">
                <h2 className="font-bold text-4xl py-4 text-center">
                    {quiz.title}
                </h2>
                <div className="grid grid-cols-3 p-4 border-b border-t">
                    <div>
                        <p className="text-small text-gray-600 text-center">Total Questions:</p>
                        <p className="text-center">{quiz.questions.length} questions</p>
                    </div>
                    <div>
                        <p className="text-small text-gray-600 text-center">Plays:</p>
                        <p className="text-center">{quiz.totalPlays}</p>
                    </div>
                    <div>
                        <p className="text-small text-gray-600 text-center">Likes:</p>
                        <p className="text-center">120</p>
                    </div>
                </div>
                {/* <div className="flex justify-center my-4">
                    <Link
                        to={`/quiz/${quiz.id}/play`}
                        className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600 ml-4 shadow items-center inline-flex"
                    >
                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="ml-1">Play</p>
                    </Link>
                </div> */}
                <div>
                    <div className="flex justify-center">
                        <div className="inline-block p-4">
                            <h2 className="font-bold text-2xl mb-4 text-center">Scores</h2>
                            {!scoresPaginator ? (
                                <LoadingMessage message={'Loading scores'} />
                            ) : (
                                    <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={onScoresPageChange} />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    scoresPaginator: PropTypes.object,
    onLikesUpdated: PropTypes.func.isRequired,
    onScoresPageChange: PropTypes.func.isRequired
};

export default QuizDetail;
