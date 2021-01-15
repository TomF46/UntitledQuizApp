import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchChallenges, searchChallengesWithPagination } from "../../api/challengesApi";
import { toast } from "react-toastify";
import _, { debounce, filter } from 'lodash';
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import ChallengeListWithPagination from "../DisplayComponents/ChallengesListWithPagination";
import ChallengesFiltersForm from "./Filters/ChallengesFiltersForm";


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
            console.log(challengesData);
            setChallengesPaginator(challengesData);
        }).catch(error => {
            toast.error("Error getting challenges " + error.message, {
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
        searchChallengesWithPagination(pageUrl, filters).then(challengesData => {
            setChallengesPaginator(challengesData);
        }).catch(error => {
            toast.error("Error getting challenges " + error.message, {
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
                        <div className="col-span-12 lg:col-span-3 lg:mr-4 px-4 pb-4 overflow-hidden shadow-lg page">
                            <h1 className="font-bold text-4xl my-4 text-center">Details</h1>
                            <p>After completing a quiz you can challenge another user to beat or match your score, this page shows a record of all of your challenges so far (challenger or recipient). Coming soon challenge scoring leaderboard win points by winning challenges.</p>
                        </div>
                        <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow-lg page">
                            <h1 className="font-bold text-4xl my-4 text-center">Challenges</h1>
                            {challengesPaginator.total > 0 ? (
                                <ChallengeListWithPagination paginationData={challengesPaginator} onPageChange={getChallengesPage} />
                            ) : (
                                    <p className="text-center">You have no challenges which match your search</p>
                                )}
                        </div>
                    </div>
                )}
        </div>

    );
};

ChallengesPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ChallengesPage;