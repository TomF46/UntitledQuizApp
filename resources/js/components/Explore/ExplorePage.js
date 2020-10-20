import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuiz, getQuizzes, getQuizzesWithPagination, searchQuizzes, searchQuizzesWithPagination } from "../../api/quizApi";
import QuizList from "../DisplayComponents/QuizList";
import { toast } from "react-toastify";
import PaginationControls from "../DisplayComponents/PaginationControls";
import TextInput from "../FormComponents/TextInput";
import _, {debounce} from 'lodash';
import { getTags } from "../../api/tagsApi";
import SelectInput from "../FormComponents/SelectInput";

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
          getTags().then(data => {
            let tags = data.map(tag => {
                return {value: tag.id, text: tag.name}
            });
            setTags(tags);

          }).catch(error => {
              console.log(error);
          })
        }
      }, tags);

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
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function getQuizPage(pageUrl){
        searchQuizzesWithPagination(pageUrl, filters).then(quizzesData => {
            setQuizzesPaginator(quizzesData);
        }).catch(error => {
            console.log("Error getting quizzes " + error);
            toast.error("Error getting quizzes " + error.message,{
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event){
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    }

    function handleTagChange(event){
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            'tag': Number(value)
        }));
    }

    return (
        <div className="explore-page overflow-hidden shadow-lg page mb-2">
            {!quizzesPaginator ? (
                <p>... loading quizzes to explore</p>
            ) : (
            <div>
                <h1 className="font-bold text-4xl py-4 text-center pageHeader">Explore</h1>
                <div className="border-b p-4 grid grid-cols-3">
                    <div className="p-1">
                        <TextInput
                            name="searchTerm"
                            label="Search"
                            value={filters.searchTerm}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div></div>
                    <div className="p-1">
                        <SelectInput
                            name="tag"
                            label="Tag"
                            value={filters.tag}
                            options={tags}
                            onChange={handleTagChange}
                        />
                    </div>
                </div>
                <QuizList quizzes={quizzesPaginator.data} />
                <PaginationControls to={quizzesPaginator.to} from={quizzesPaginator.from} of={quizzesPaginator.total} onNext={() => getQuizPage(quizzesPaginator.next_page_url)} onPrevious={() => getQuizPage(quizzesPaginator.prev_page_url)} currentPage={quizzesPaginator.current_page} lastPage={quizzesPaginator.last_page} />
            </div>
            )}
        </div>
    );
};

ExplorePage.propTypes = {
    history: PropTypes.object.isRequired
};

export default ExplorePage;
