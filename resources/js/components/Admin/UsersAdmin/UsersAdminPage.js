import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUsers, getUsersPage, searchUsers, searchUsersWithPage } from "../../../api/userApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import UsersListWithPagination from "../../DisplayComponents/UsersListWithPagination";
import UserSearchForm from "../../DisplayComponents/UserSearchForm";
import _, { debounce } from 'lodash';

const UsersAdminPage = ({ history }) => {
    const [usersPaginator, setUsersPaginator] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!usersPaginator) {
            search();
        }
    }, [usersPaginator])

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerm])

    function search() {
        searchUsers(searchTerm).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error(`Error getting users ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function getUsersWithUrl(url) {
        searchUsersWithPage(url, searchTerm).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error(`Error getting users ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleSearchTermChange(event) {
        const { name, value } = event.target;
        setSearchTerm(value);
    }

    return (
        <div className="users-admin-page">
            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow page">
                    <h1 className="font-bold text-4xl my-4 text-center">Admin controls</h1>
                    <p className="my-4">Search, view, and administer registered users.</p>
                    <h1 className="font-bold text-4xl my-4 text-center">Search</h1>
                    <UserSearchForm searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
                </div>
                <div className="col-span-12 lg:col-span-9 overflow-hidden shadow page px-4">
                    {!usersPaginator ? (
                        <LoadingMessage message={'Loading users'} />
                    ) : (
                        <>
                            <h1 className="font-bold text-4xl my-4 text-center">Users</h1>
                            {usersPaginator.total > 0 ? (
                                <UsersListWithPagination paginationData={usersPaginator} onPageChange={getUsersWithUrl} />
                            ) : (
                                <p className="text-center">There are currently no users added.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

UsersAdminPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default UsersAdminPage;
