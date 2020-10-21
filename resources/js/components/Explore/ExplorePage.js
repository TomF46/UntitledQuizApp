import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchQuizzes, searchQuizzesWithPagination } from "../../api/quizApi";
import { toast } from "react-toastify";
import _, {debounce} from 'lodash';
import { getTags } from "../../api/tagsApi";
import QuizListWithPagination from "../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import FiltersForm from "./Filters/FiltersForm";

const ExplorePage = ({ history }) => {
    const [quizzesPaginator, setQuizzesPaginator] = useState(null);
    const [filters, setFilters] = useState({searchTerm: "", tag: null});
    const [tags, setTags] = useState(null);


    useEffect(() => {
        if(!quizzesPaginator) {
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
            () => {search();}, 50
        );
        
        debounced(); 
    }, [filters])

    function search(){
        searchQuizzes(filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function getQuizPage(pageUrl){
        searchQuizzesWithPagination(pageUrl, filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event){
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: name == "tag" ? Number(value) : value
        }));
    }

    return (
        <div className="explore-page overflow-hidden shadow-lg page mb-2">
            {!quizzesPaginator ? (
                <LoadingMessage message={'Loading quizzes to explore'} />
            ) : (
            <div>
                <h1 className="font-bold text-4xl py-4 text-center pageHeader">Explore</h1>
                <FiltersForm filters={filters} tags={tags} onFilterChange={handleFilterChange} />
                <QuizListWithPagination paginationData={quizzesPaginator} onPageChange={getQuizPage} />
            </div>
            )}
        </div>
    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;
