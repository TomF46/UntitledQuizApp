import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchQuizBans, searchQuizBansWithPagination } from "../../../api/banApi";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import BannedQuizListWithPagination from "../../DisplayComponents/BannedQuizListWithPagination";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import BannedQuizFiltersForm from "./BannedQuizFiltersForm";
import { unban } from "../../../api/quizApi";

const QuizBanListPage = ({ history }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [filters, setFilters] = useState({ searchTerm: "", user: "" });
    const [currentPageUrl, setCurrentPageUrl] = useState(null);


    useEffect(() => {
        if (!quizzesPaginator) {
            search();
        }
    }, [quizzesPaginator])

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        searchQuizBans(filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting banned quizzes " + error.message, {
                autoClose: false,
            });
        });
    }

    function getQuizPage(pageUrl) {
        searchQuizBansWithPagination(pageUrl, filters).then(quizzesData => {
            setCurrentPageUrl(pageUrl);
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting banned quizzes " + error.message, {
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

    function handleQuizUnban(id) {
        unban(id).then(res => {
            toast.success("Quiz unbanned")
            currentPageUrl ? getQuizPage(currentPageUrl) : search();
        }).catch(error => {
            toast.error("Error unbanning quiz " + error.message, {
                autoClose: false,
            });
        })
    }

    return (
        <div className="quiz-ban-list-page">
            {!quizzesPaginator ? (
                <LoadingMessage message={'Loading banned quizzes to explore'} />
            ) : (
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-3 lg:mr-4 px-4 pb-4 overflow-hidden shadow-lg page">
                        <h1 className="font-bold text-4xl my-4 text-center">Search</h1>
                        <BannedQuizFiltersForm filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                    <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow-lg page">
                        <h1 className="font-bold text-4xl my-4 text-center">Banned Quizzes</h1>
                        {quizzesPaginator.total > 0 ? (
                            <BannedQuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizPage} onQuizUnban={handleQuizUnban} />
                        ) : (
                            <p className="text-center">No banned quizzes match your search</p>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
};

QuizBanListPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default QuizBanListPage;
