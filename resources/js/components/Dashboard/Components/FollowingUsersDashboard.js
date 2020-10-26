import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import PaginationControls from "../../DisplayComponents/PaginationControls";
import { getUsersWithPaginator, getFollowedUsers } from "../../../api/userApi"
import UsersList from "../../DisplayComponents/UsersList";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";

const FollowingUsersDashboard = ({ user }) => {
    const [usersPaginator, setUsers] = useState(null);


    useEffect(() => {
        if (!usersPaginator) {
            getFollowedUsers().then(usersData => {
                console.log(usersData);
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
                                <UsersList users={usersPaginator.data} />
                                <PaginationControls to={usersPaginator.to} from={usersPaginator.from} of={usersPaginator.total} onNext={() => getUsersPage(usersPaginator.next_page_url)} onPrevious={() => getUsersPage(usersPaginator.prev_page_url)} currentPage={usersPaginator.current_page} lastPage={usersPaginator.last_page} />
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
