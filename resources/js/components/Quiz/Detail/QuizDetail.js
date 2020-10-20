import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScoresTable from "../../DisplayComponents/ScoresTable";

const QuizDetail = ({ quiz, scores, onLike, onDislike }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-2xl mb-4 text-center">{quiz.title}</h1>
            <div className="p-4 flex justify-between items-center border-t">
                <div className="flex">
                </div>
                <div className="flex justify-right">
                    <button
                        type="button"
                        onClick={onLike}
                        className="bg-white text-whitepy-2 px-4 mr-2 inline-flex items-center"
                    >
                        <svg className={`${quiz.likedByUser ? "text-purple-400" : "text-black"} hover:text-purple-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="ml-1">{quiz.totalLikes}</span>
                    </button>
                    <button
                        type="button"
                        onClick={onDislike}
                        className="bg-white text-whitepy-2 px-4 mr-2 inline-flex items-center"
                    >
                        <svg className={`${quiz.dislikedByUser ? "text-purple-400" : "text-black"} hover:text-purple-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                        <span className="ml-1">{quiz.totalDislikes}</span>
                    </button>
                </div>
            </div>
            <div className="rounded mb-4 p-4 border-t">
                <h3 className="text-lg font-bold text-center">Description</h3>
                <p className="text-center">{quiz.description}</p>
                {quiz.tags && quiz.tags.length > 0 && (
                    <ul className="tagList text-center my-4">
                        {quiz.tags.map((tag) => {
                            return (
                                <li className="rounded-full py-1 px-4 bg-purple-400 hover:bg-purple-500 text-white shadow" key={tag.id}>{tag.name}</li>
                            )
                        })}
                    </ul>
                )}
            </div>
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
            <div className="flex justify-center my-4">
                <Link
                    to={`/quiz/${quiz.id}/play`}
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4 shadow"
                >
                    Play
                </Link>
            </div>
            <div>
                <div className="flex justify-center">
                <div className="inline-block p-4 mb-4">
                    <h2 className="font-bold text-2xl mb-4 text-center">Scores</h2>
                    <ScoresTable scores={scores} />
                </div>
                </div>
            </div>
        </div>
    );
};

QuizDetail.propTypes = {
    quiz: PropTypes.object.isRequired,
    scores: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired
};

export default QuizDetail;
