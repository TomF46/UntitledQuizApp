import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchQuizzes, searchQuizzesWithPagination } from "../../api/quizApi";
import { toast } from "react-toastify";
import TextInput from "../FormComponents/TextInput";
import _, {debounce} from 'lodash';
import { getTags } from "../../api/tagsApi";
import SelectInput from "../FormComponents/SelectInput";
import QuizListWithPagination from "../DisplayComponents/QuizListWithPagination";
import LoadingMessage from "../DisplayComponents/LoadingMessage";

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
                //TODO if this happens eveywhere we get tags just do it on server 
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
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
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
