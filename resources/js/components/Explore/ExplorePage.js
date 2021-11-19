import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchQuizzes, searchQuizzesWithPagination } from "../../api/quizApi";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import { getTags } from "../../api/tagsApi";
import QuizListWithPagination from "../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import FiltersForm from "./Filters/FiltersForm";

const ExplorePage = ({ history }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [filters, setFilters] = useState({ searchTerm: "", user: "", tag: null, onlyShowRecommended: false });
    const [tags, setTags] = useState(null);


    useEffect(() => {
        if (!quizzesPaginator) {
            search();
        }
    }, [quizzesPaginator])

    useEffect(() => {
        if (!tags) {
            getTags().then(tags => {
                setTags(tags);
            });
        }
    }, [tags]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        console.log(filters);
        searchQuizzes(filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting quizzes " + error.message, {
                autoClose: false,
            });
        });
    }

    function getQuizPage(pageUrl) {
        searchQuizzesWithPagination(pageUrl, filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting quizzes " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event) {
        const { name, value, checked } = event.target;

        let input = value;

        input = name == "tag" ? Number(value) : input;

        input = name == "onlyShowRecommended" ? checked : input;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: input
        }));
    }

    return (
        <div className="explore-page">
            {!quizzesPaginator ? (
                <LoadingMessage message={'Loading quizzes to explore'} />
            ) : (
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 pb-4 overflow-hidden shadow page">
                        <h1 className="font-bold text-4xl my-4 text-center">Search</h1>
                        <FiltersForm filters={filters} tags={tags} onFilterChange={handleFilterChange} />
                    </div>
                    <div className="col-span-12 lg:col-span-9 px-4 overflow-hidden shadow page">
                        <h1 className="font-bold text-4xl my-4 text-center">Explore</h1>
                        {quizzesPaginator.total > 0 ? (
                            <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizPage} />
                        ) : (
                            <p className="text-center">No quizzes match your search</p>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;
