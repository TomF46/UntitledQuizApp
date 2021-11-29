import React from "react";
import PropTypes from "prop-types";

const ChallengeInfoPanel = ({ challenge }) => {
    return (
        <div className="overflow-hidden shadow">
            <div className="grid grid-cols-12 px-2 py-1 bg-secondary overflow-hidden">
                <div className="hidden lg:block lg:col-span-3"></div>
                <div className="col-span-6 lg:col-span-3 text-center">
                    <p className="text-sm text-white">Challenger</p>
                    <p className="font-medium text-white items-center">{challenge.challengerUsername}</p>
                </div>
                <div className="col-span-6 lg:col-span-3 text-center">
                    <p className="text-sm text-white">Score required</p>
                    <p className="font-medium text-white items-center">{challenge.scorePercentToBeat}%</p>
                </div>
                <div className="hidden lg:block lg:col-span-3"></div>
            </div>
        </div>
    );
};

ChallengeInfoPanel.propTypes = {
    challenge: PropTypes.object.isRequired,
};

export default ChallengeInfoPanel;
