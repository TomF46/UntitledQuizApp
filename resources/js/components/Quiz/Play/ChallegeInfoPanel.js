import React from "react";
import PropTypes from "prop-types";

const ChallengeInfoPanel = ({ challenge }) => {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-12 px-2 py-1 overflow-hidden">
                <div className="hidden lg:col-span-3"></div>
                <div className="col-span-4 lg:col-span-2 text-center">
                    <p className="text-sm text-gray-600">Challenger</p>
                    <p className="font-medium items-center">{challenge.challengerUsername}</p>
                </div>
                <div className="col-span-4 lg:col-span-2 text-center">
                    <p className="text-sm text-gray-600">Quiz</p>
                    <p className="font-medium items-center">{challenge.quizName}</p>
                </div>
                <div className="col-span-4 lg:col-span-2 text-center">
                    <p className="text-sm text-gray-600">Score required</p>
                    <p className="font-medium items-center">{challenge.scorePercentToBeat}%</p>
                </div>
                <div className="hidden lg:col-span-3"></div>
            </div>
        </div>
    );
};

ChallengeInfoPanel.propTypes = {
    challenge: PropTypes.object.isRequired,
};

export default ChallengeInfoPanel;
