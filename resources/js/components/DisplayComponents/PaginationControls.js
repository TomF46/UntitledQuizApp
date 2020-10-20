import React from "react";
import PropTypes from "prop-types";

const PaginationControls = ({ from, to, of, onNext, onPrevious, currentPage, lastPage }) => {
    return (
        <div className="pagination-controls p-4">
            <div className="flex justify-between">
                <div>
                    <p>{`Showing ${from ? from : 0} to ${to ? to : 0} of ${of}`}</p>
                </div>
                <div>
                        {currentPage > 1 &&
                            <button
                                type="button"
                                onClick={onPrevious}
                                className="bg-purple-400 text-white rounded py-2 px-4 mr-2 hover:bg-purple-500 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                    </svg>
                                    <span className="ml-1">Previous</span>
                            </button>
                        }
                        {currentPage != lastPage && 
                            <button
                                type="button"
                                onClick={onNext}
                                className="bg-purple-400 text-white rounded py-2 px-4 hover:bg-purple-500 shadow inline-flex items-center"
                                >
                                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="ml-1">Next</span>
                            </button>
                        }
                </div>
            </div>
        </div>
    );
};

PaginationControls.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    of: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired

};

export default PaginationControls;
