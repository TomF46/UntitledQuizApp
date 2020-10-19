import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScoresTable from "../../DisplayComponents/ScoresTable";

const QuizDetail = ({ quiz, scores }) => {
    return (
        <div className="mt-6">
            <h1 className="font-bold text-2xl mb-4 text-center">{quiz.title}</h1>
            <div className="rounded overflow-hidden shadow-lg card mb-4">
                <h3 className="text-lg font-bold text-center">Description</h3>
                <p className="text-center">{quiz.description}</p>
                {quiz.tags && quiz.tags.length > 0 && (
                    <ul className="tagList text-center my-4">
                        {quiz.tags.map((tag) => {
                            return (
                                <li className="rounded-full py-1 px-4 bg-purple-400 hover:bg-purple-500 text-white" key={tag.id}>{tag.name}</li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div className="grid grid-cols-3 rounded overflow-hidden shadow-lg card p-4">
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
                    className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 ml-4"
                >
                    Play
                </Link>
            </div>
            <div>
                <div className="flex justify-center">
                <div className="inline-block p-4 rounded overflow-hidden shadow-lg card mb-4 border-t-8 border-purple-500">
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
    scores: PropTypes.array.isRequired
};

export default QuizDetail;
