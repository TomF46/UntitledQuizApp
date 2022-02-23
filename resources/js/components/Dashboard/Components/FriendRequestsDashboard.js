import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { acceptFriendRequest, getFriendRequestsList, removeOrRejectFriend } from "../../../api/friendsApi";
import { getPageWithPaginationUrl } from "../../../api/paginationApi";
import FriendRequestsListWithPagination from "../../Friends/FriendRequestsList/FriendRequestsListWithPagination";

const FriendRequestsDashboard = () => {
    const [friendRequestsPaginator, setFriendRequestsPaginator] = useState(null);

    useEffect(() => {
        if (!friendRequestsPaginator) {
            getFriendRequests();
        }
    }, [friendRequestsPaginator])

    function getFriendRequests() {
        getFriendRequestsList().then(friendRequestsData => {
            setFriendRequestsPaginator(friendRequestsData);
        }).catch(error => {
            toast.error(`Error getting friend requests ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleRemoveOrRejectFriend(id) {
        confirmAlert({
            title: "Confirm action",
            message: `Are you sure you want to do this?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        removeOrRejectFriend(id).then(() => {
                            getFriendRequests();
                        }).catch(error => {
                            toast.error(`Error remove or rejecting ${error.message}`, {
                                autoClose: false,
                            });
                        });
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function handleAcceptFriendRequest(id) {
        acceptFriendRequest(id).then(() => {
            getFriendRequests();
        }).catch(error => {
            toast.error(`Error accepting request ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleFriendRequestsListPageChange(url) {
        getPageWithPaginationUrl(url).then(friendRequestsData => {
            setFriendRequestsPaginator(friendRequestsData);
        }).catch(error => {
            toast.error(`Error getting friend requests ${error.message}`, {
                autoClose: false,
            });
        });
    }



    return (
        friendRequestsPaginator && friendRequestsPaginator.total > 0 && (
            <div className="mb-6 overflow-hidden shadow card">
                <div className="users-following-dashboard px-4 py-2">
                    <h1 className="font-bold text-primary text-2xl text-center md:text-left">Friend requests</h1>
                    <FriendRequestsListWithPagination paginationData={friendRequestsPaginator} onPageChange={handleFriendRequestsListPageChange} onAccept={handleAcceptFriendRequest} onRemove={handleRemoveOrRejectFriend} />
                </div>
            </div>
        )

    );
};

export default FriendRequestsDashboard;
