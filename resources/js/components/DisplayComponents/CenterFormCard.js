import React from "react";
import PropTypes from "prop-types";

const CenterFormCard = ({ content }) => {
    return (
        <div className="centerFormCardContainer mt-24">
            <div className="centerFormCard max-w-md p-6 rounded overflow-hidden card border-t-8 border-primary shadow">
                {content}
            </div>
        </div>
    );
};

CenterFormCard.propTypes = {
    content: PropTypes.element.isRequired
};

export default CenterFormCard;
