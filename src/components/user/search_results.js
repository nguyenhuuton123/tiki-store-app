import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {search, selectLoading, selectSearchResult} from "../../features/user/admin_silce";
import {useNavigate} from "react-router-dom";
import {RiUserSearchFill} from "react-icons/ri";
import "../../assets/css/navbar.css";
import Table from "react-bootstrap/table";
import Pagination from "@mui/material/Pagination";

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const searchResult = useSelector(selectSearchResult);
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    const [searchList, setSearchList] = useState([]);

    const [searchRequest, setSearchRequest] = useState({
        username: "",
        fullName: "",
        email: "",
        searchQuery: undefined

    });

    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const handleSearch = (e) => {
        const {name, value} = e.target;
        setSearchRequest((prev) => ({
            ...prev,
            [name]: value,
            email: name === 'searchQuery' ? value : prev.email,
            username: name === 'searchQuery' ? value : prev.username,
            fullName: name === 'searchQuery' ? value : prev.fullName,
        }));
    };

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(5)

    const handleSearchSubmit = () => {
        const requestData = {
            searchRequest: searchRequest,
            page: 1,
        };
        dispatch(search(requestData));
    };

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

    const getSearchUser = async ({currentPage}) => {
        dispatch(search({currentPage}));
    }

    useEffect(() => {
        if (render) {
            getSearchUser({currentPage});
            setRender(false);
        }
        setSearchList(searchResult?.content);
        setTotalPages(searchResult?.totalPages);
    }, [currentPage, render, searchResult]);

    const handleUserClick = (userId) => {
        navigate(`/admin/user-detail/${userId}`);
    };

    return (
        <div className="SearchResults">
            <h1 className="text-center m-3">Search Users</h1>
            <div className="row mb-3">
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <input
                            className="form-control border-end-0 border rounded-pill"
                            type="text"
                            name="searchQuery"
                            placeholder="Search by email, username, or full name..."
                            value={searchRequest.searchQuery}
                            onChange={handleSearch}
                            style={{marginRight: '-55px', height: 44}}
                        />
                        <span className="input-group-append">
                        <button
                            className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                            type="button"
                            onClick={handleSearchSubmit}
                            style={{zIndex: 9999}}
                        >
                            <RiUserSearchFill size={30}/>
                        </button>
                        </span>
                    </div>
                </div>
            </div>

            <Table striped bordered hover className="w-75 m-auto mb-5 align-middle">
                <thead className="text-center">
                <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="6" className="text-center">
                            Loading...
                        </td>
                    </tr>
                ) : searchResult && searchResult.content && searchResult.content.length > 0 ? (
                    searchResult.content.map((result) => (
                        <tr key={result.id}>
                            <td className="text-center">
                                <img src={result.avatar} alt="avatar"/>
                            </td>
                            <td>{result.username}</td>
                            <td>{result.fullName}</td>
                            <td>{result.email}</td>
                            <td>{result.phoneNumber}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">
                            No results found.
                        </td>
                    </tr>
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
};
export default SearchResultsPage;
