import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../../services/operations/profileAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';

function OtherUserProfilePage() {

    const [userDetails, setUserDetails] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token").split('"')[1];
                await dispatch(getUserDetails(token, { "id": localStorage.getItem("userId") }, navigate)).then((res) => {
                    setUserDetails(res.data.post);
                    console.log("OtherUser", userDetails);
                    console.log("OtherUserDetails.......", res);
                });
            }
            catch (err) {
                navigate("/");
                dispatch(logout(navigate));
                console.log("error in fetching user details", err, err.message);
            }
        }
        fetchData();
    }, [])
    return (
        <div>

        </div>
    )
}

export default OtherUserProfilePage
