import React from "react";
import {Link, Outlet} from "react-router-dom";
import {
    ClipboardText,
    CalendarCheck,
    FileSearch,
    UserSwitch,
    Package,
    ListBullets
} from "phosphor-react";
import {useNavigate} from "react-router-dom";

import "../../assets/css/navbar.css";
import {useDispatch} from "react-redux";
import {logoutAsync} from "../../features/user/auth_silce"

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem("accessToken");
            await dispatch(logoutAsync());
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <>
            <div className="navbar">
                <div className="links">
                    <Link to={`/admin/active-users`} className="activeuser">
                        <CalendarCheck size={46}/>
                        List <br/>
                        User
                    </Link>

                    <Link
                        to={`/admin/fetch-deleted-users`}
                        className="fetchfdeletedusers"
                    >
                        <ClipboardText size={46}/>
                        Deleted
                        <br/>
                        Users
                    </Link>

                    <Link
                        to={`/admin/search-results`}
                        className="searchresults"
                    >
                        <FileSearch size={46}/>
                        Search
                        <br/>
                        Users
                    </Link>

                    <Link
                        to={`/admin/search-results`}
                        className="searchresults"
                    >
                        <ListBullets size={46}/>
                        Product
                    </Link>

                    <Link
                        to={`/admin/add-product`}
                        className="searchresults"
                    >
                        <Package size={46}/>
                        Add
                        <br/>
                        Product
                    </Link>

                    <button className="logout-navbar" onClick={handleLogout}>
                        <UserSwitch size={44}/>
                        User
                        <br/>
                        Switch
                    </button>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Navbar;