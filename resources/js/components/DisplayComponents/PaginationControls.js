import React from "react";
import PropTypes from "prop-types";

const PaginationControls = ({ from, to, of, onNext, onPrevious, currentPage, lastPage }) => {
    return (
        <div className="pagination-controls p-4">
            <div className="flex justify-between">
                <div>
                    <p>{`Showing ${from} to ${to} of ${of}`}</p>
                </div>
                <div>
                        {currentPage > 1 &&
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow"
                                >
                                    Previous
                            </button>
                        }
                        {currentPage != lastPage && 
                            <button
                                type="button"
                                onClick={onNext}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow"
                                >
                                    Next
                            </button>
                        }
                </div>
            </div>
        </div>
    );
};

PaginationControls.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    of: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired

};

export default PaginationControls;
