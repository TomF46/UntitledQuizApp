import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getUsersWithPaginator, getFollowedUsers } from "../../../api/userApi"
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import UsersListWithPagination from "../../DisplayComponents/UsersListWithPagination";

const FollowingUsersDashboard = ({ user }) => {
    const [usersPaginator, setUsers] = useState(null);


    useEffect(() => {
        if (!usersPaginator) {
            getFollowedUsers().then(usersData => {
                setUsers(usersData)
            }).catch(error => {
                toast.error("Error getting users " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [usersPaginator])

    function getUsersPage(url) {
        getUsersWithPaginator(url).then(usersData => {
            setUsers(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="users-following-dashboard px-4">
            {usersPaginator == null ? (
                <LoadingMessage message={'Loading followed users dashboard'} />
            ) : (
                <div>
                    <h1 className="font-bold text-2xl mb-2">People you follow</h1>
                    {usersPaginator.total > 0 ? (
                        <div>
                            <UsersListWithPagination paginationData={usersPaginator} onPageChange={getUsersPage} />
                        </div>
                    ) : (
                        <p>You dont currently follow any users.</p>
                    )}
                </div>
            )}
        </div>
    );
};

FollowingUsersDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FollowingUsersDashboard;
