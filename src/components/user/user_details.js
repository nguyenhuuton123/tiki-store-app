import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectLoading, selectUserDetails, userDetails} from '../../features/user/admin_silce';
import {useParams} from "react-router-dom";
import "../../assets/css/user_details.css"

const UserDetails = () => {
    const loading = useSelector(selectLoading);
    const userDetail = useSelector(selectUserDetails);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(userDetails(id));
    }, [dispatch, id]);
    
    return (
        <div className="user-details-page">
            <img className="back-img"
                 src="https://images.unsplash.com/photo-1546527706-59aa9718a426?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <table className="user-details-table">
                <h2 className="user-details-title">Details of {userDetail?.fullName}</h2>
                <div className="container">

                    <div className="user-info">

                        <img src={userDetail?.avatar} alt="User Avatar" className="avatar"/>

                        <p className="user-details-element">{userDetail?.fullName}</p>
                        <p className="user-details-element">{userDetail?.email}</p>
                        

                    </div>

                    <div className="profile-settings">
                        <p className="user-details-element">Date of birth: {userDetail?.date}</p>
                        <p className="user-details-element">Gender: {userDetail?.gender}</p>
                        <p className="user-details-element">Phone: {userDetail?.phoneNumber}</p>
                    </div>
                </div>
            </table>
        </div>
    );

};

export default UserDetails;
