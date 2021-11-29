import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScoresTableWithPagination from "../../DisplayComponents/ScoresTableWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import LikeControls from "../../DisplayComponents/LikeControls";
import CommentsSection from "../../DisplayComponents/Comments/CommentsSection"
import _ from 'lodash';
import BanInfo from "../../DisplayComponents/BanInfo";

const QuizDetail = ({ quiz, scoresPaginator, onScoresPageChange, onQuizReload, isCreator, onDelete, userHighScore, isAdmin, onQuizToggleBan, onToggleRecommended }) => {
    return (
        <div className="grid grid-cols-12 pb-4">
            <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow page">
                <h2 className="lg:hidden font-bold text-4xl py-4 border-b lg:border-none text-center">
                    {quiz.title}
                </h2>
                <h2 className="hidden lg:block font-bold text-4xl py-4 border-b lg:border-none text-center">
                    Details
                </h2>
                {!!quiz.recommended && (
                    <div className="flex items-center flex-shrink-0">
                        <img src="https://untitled-quiz-app-images.s3.eu-west-1.amazonaws.com/QAppRecommended.png" className="w-32 m-auto" />
                    </div>
                )}
                <div className="p-4 flex justify-center items-center">
                    <LikeControls quiz={quiz} onLikesUpdated={onQuizReload} />
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
                                        <li className="rounded-full py-1 px-4 bg-primary  hover:opacity-75 my-1 text-white shadow" key={tag.id}>{tag.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <Link
                    to={`/quiz/${quiz.id}/play`}
                    className="border border-gray-800 bg-primary  text-white text-center rounded container py-2 px-4 my-4 hover:opacity-75 shadow inline-flex items-center justify-center"
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
                        <Link to={`/profile/${quiz.creator.id}`} className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:bg-secondary hover:text-white hover:border-white shadow">View profile</Link>
                    </div>
                </div>
                {isCreator ? (
                    <>
                        <h3 className="text-lg font-bold text-center my-4">Actions</h3>
                        <div className="flex flex-col justify-center text-center">
                            <Link
                                to={`/quiz/${quiz.id}/edit`}
                                className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center justify-center"
                            >
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="ml-1">Edit Quiz</span>
                            </Link>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="border border-red-400 text-red-400 text-center rounded mt-2 py-2 px-4 hover:bg-red-600 hover:text-white shadow inline-flex items-center justify-center"
                            >
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="ml-1">Delete</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {
                            isAdmin && (
                                <>
                                    <h3 className="text-lg font-bold text-center my-4">Admin controls</h3>
                                    <div className="flex flex-col justify-center text-center">
                                        <button
                                            type="button"
                                            onClick={onQuizToggleBan}
                                            className="border border-red-400 text-red-400 text-center rounded py-2 px-4 mt-4 hover:bg-red-600 hover:text-white shadow inline-flex items-center justify-center"
                                        >
                                            <svg className="text-red-400 hover:text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span className="ml-1">{quiz.isBanned ? 'Unban' : 'Ban'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onToggleRecommended}
                                            className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 mt-4 hover:opacity-75 shadow inline-flex items-center justify-center"
                                        >
                                            <svg className="text-gray-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span className="ml-1">{quiz.recommended ? 'Remove Recommendation' : 'Recommend'}</span>
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}
            </div>
            <div className="col-span-12 lg:col-span-9">
                <div className="overflow-hidden shadow card">
                    <h2 className="hidden lg:block font-bold text-4xl py-4 text-center">
                        {quiz.title}
                    </h2>
                    <div className="grid grid-cols-3 p-4">
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
                            <p className="text-center">{quiz.totalLikes}</p>
                        </div>
                    </div>
                </div>
                {!quiz.isBanned ? (
                    <>
                        {!_.isEmpty(userHighScore) && (
                            <div className="grid grid-cols-12 p-4 my-4 overflow-hidden shadow card">
                                <div className="col-span-12">
                                    <h2 className="font-bold text-primary text-2xl mb-4 text-center">Your high score</h2>
                                </div>
                                <div className="col-span-6 text-center">
                                    <p className="text-sm text-gray-600">Score</p>
                                    <p className="font-medium items-center">{userHighScore.score}</p>
                                </div>
                                <div className="col-span-6 text-center">
                                    <p className="text-sm text-gray-600">Score percentage</p>
                                    <p className="font-medium items-center">{userHighScore.score_percent}%</p>
                                </div>

                            </div>
                        )}
                        <div>
                            <div className="flex justify-center overflow-hidden shadow card">
                                <div className="inline-block p-4 min-w-full">
                                    <h2 className="font-bold text-primary text-2xl mb-4 text-center">Scores</h2>
                                    {!scoresPaginator ? (
                                        <LoadingMessage message={'Loading scores'} />
                                    ) : (
                                        <ScoresTableWithPagination paginationData={scoresPaginator} onPageChange={onScoresPageChange} showUser={true} showQuiz={false} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <CommentsSection quizId={quiz.id} comments={quiz.comments} onReloadQuiz={onQuizReload} />
                    </>
                ) : (
                    <BanInfo banId={quiz.banId} />
                )}
            </div>
        </div >
    );
};

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    userHighScore: PropTypes.object,
    scoresPaginator: PropTypes.object,
    onQuizReload: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onScoresPageChange: PropTypes.func.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onQuizToggleBan: PropTypes.func.isRequired,
    onToggleRecommended: PropTypes.func.isRequired
};

export default QuizDetail;
