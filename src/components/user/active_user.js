import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    activeUsers,
    lockUser,
    selectUsersList,
    unlockUser,
} from "../../features/user/user_slice";
import {useDispatch, useSelector} from "react-redux";
import {FaLock, FaLockOpen} from "react-icons/fa";
import Swal from "sweetalert2";
import Table from "react-bootstrap/table";
import Pagination from '@mui/material/Pagination';
import {useNavigate} from 'react-router-dom';

export default function ActiveUsers() {
    const dispatch = useDispatch();
    const users = useSelector(selectUsersList);
    const [userList, setUserList] = useState([]);
    const [render, setRender] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(5)
    const navigate = useNavigate();

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        setRender(true);

    };
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setRender(true);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
        setRender(true);
    };

    const handleUserClick = (userId) => {
        navigate(`/admin/user-detail/${userId}`);
    };
    const getActiveUsers = async ({currentPage}) => {
        dispatch(activeUsers({currentPage}));
    };
    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };


    useEffect(() => {
        if (render) {
            getActiveUsers({currentPage});
            setRender(false);
        }
        setUserList(users?.content);
        setTotalPages(users?.totalPages);
    }, [users, render, currentPage, dispatch]);

    const handleIconClick = async (id, activated) => {
        if (activated) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, block it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(unlockUser(id));
                    setRender(true);
                    Swal.fire({
                        title: "Blocked!",
                        text: "This account has been locked.",
                        icon: "success",
                    });
                }
            });
        } else {
            dispatch(lockUser(id));
            setRender(true);
            Swal.fire({
                title: "UnBlocked!",
                text: "This account has been unlocked.",
                icon: "success",
            });
        }
    };

    return (

        <div>
            <h1 className="text-center m-3">Active Users</h1>
            <Table striped bordered hover className="w-75 m-auto mb-5 align-middle">
                <thead className="text-center">
                <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Lock</th>
                </tr>
                </thead>
                <tbody>
                {userList !== undefined && userList !== null ? (
                    userList.map((user) => (
                        <tr key={user.id}>
                            <td className="text-center">
                                <img src={user.avatar} alt="avatar" onClick={() => handleUserClick(user.id)}></img>
                            </td>
                            <td onClick={() => handleUserClick(user.id)}>{user.username}</td>
                            <td onClick={() => handleUserClick(user.id)}>{user.fullName}</td>
                            <td onClick={() => handleUserClick(user.id)}>{user.email}</td>
                            <td onClick={() => handleUserClick(user.id)}>{user.phoneNumber}</td>
                            <td
                                onClick={() => handleIconClick(user.id, user.activated)}
                                className="text-center"
                            >
                                {user.activated ? (
                                    <FaLockOpen size={30}/>
                                ) : (
                                    <FaLock size={30}/>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>Loading...</tr>
                )}
                </tbody>
            </Table>
            <div className="page" style={pageStyle}>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 0}
                    className={`py-2 px-4 mr-2 bg-primeColor text-white font-semibold rounded hover:bg-opacity-90 transition duration-300 ${
                        currentPage <= 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Previous Page
                </button>

                <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    hidePrevButton
                    hideNextButton
                />


                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className={`py-2 px-4 bg-primeColor text-white font-semibold rounded hover:bg-opacity-90 transition duration-300 ${
                        currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}
