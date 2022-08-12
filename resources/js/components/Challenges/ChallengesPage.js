import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchChallenges } from "../../api/challengesApi";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import ChallengeListWithPagination from "../DisplayComponents/ChallengesListWithPagination";
import { Link } from "react-router-dom";
import { getPageWithPaginationUrlAndFilters } from "../../api/paginationApi";


const ChallengesPage = ({ history }) => {
    const [challengesPaginator, setChallengesPaginator] = useState(null);
    const [filters, setFilters] = useState({ quizName: "", user: "", });


    useEffect(() => {
        if (!challengesPaginator) {
            search();
        }
    }, [challengesPaginator])


    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        searchChallenges(filters).then(challengesData => {
            setChallengesPaginator(challengesData);
        }).catch(error => {
            toast.error(`Error getting challenges ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event) {
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    }

    function getChallengesPage(pageUrl) {
        getPageWithPaginationUrlAndFilters(pageUrl, filters).then(challengesData => {
            setChallengesPaginator(challengesData);
        }).catch(error => {
            toast.error(`Error getting challenges ${error.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="challenges-page">
            {!challengesPaginator ? (
                <LoadingMessage message={'Loading challenges'} />
            ) : (
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow page">
                        <h1 className="font-bold text-primary text-4xl my-4 text-center">Details</h1>
                        <p>After completing a quiz you can challenge another user to beat or match your score, this page shows a record of all of your challenges so far (challenger or recipient).</p>
                        <p className="mt-4">If your opponent matches or beats your score they get a challenge points if they fail you win a point towards the leaderboards.</p>
                        <div className="flex flex-col justify-center mt-4">
                            <Link
                                to={`/challenges/leaderboard`}
                                className="border border-gray-800 text-gray-800 text-center rounded py-2 px-4 hover:opacity-75 hover:text-secondary shadow inline-flex items-center justify-center"
                            >
                                <svg className="text-secondary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="ml-1 font-bold">View leaderboard</span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow page">
                        <h1 className="font-bold text-primary text-4xl my-4 text-center">Challenges</h1>
                        {challengesPaginator.total > 0 ? (
                            <ChallengeListWithPagination paginationData={challengesPaginator} onPageChange={getChallengesPage} />
                        ) : (
                            <p className="text-center">You have not recieved any challenges yet</p>
                        )}
                    </div>
                </div>
            )
            }
        </div >

    );
};

ChallengesPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ChallengesPage;
