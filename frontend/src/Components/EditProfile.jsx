import React, {useEffect, useState} from "react";
import './EditProfile.css';
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile, updatePassword } from "../Actions/userAction";
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET} from "../Constants/userConstants";

function EditProfile({googleUser}){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {user, isAuthenticated, loading} = useSelector(state => state.user);
    const {error, isUpdated} = useSelector((state) => state.profile);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [popup, setPopup] = useState(false);

    const handleOpenPopup = () => {
        setPopup(!popup);
    };

    const closePopup = () => {
        setPopup(false);
    };

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
        }

        if(googleUser){
            setName(googleUser.displayName);
            //setEmail(user.email);
        }
        
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated === false){
            navigate("/login");
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully!");
            dispatch(loadUser());
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [isAuthenticated, googleUser, dispatch, alert, error, user, isUpdated]);

    const updateSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(name, email));
        setPopup(false);
    }

    const onClickUpdatePassword = () => {
        navigate("/password/update");
    }

    const profileSubHeadings = ['Full Name', 'Email Address', 'Mobile Number', 'Address'];
    const profileSubValues = [name, email, '+918233474646', '104, Patel Marg, Delhi, India (302006)'];
    
    return(
        <div>
            {loading ? <Loader/> : (
            <div>
                <div class="editProfile">
                    <Header/>
                    <div class="profile">{profileSubHeadings.map((item, i) => (
                        <div>
                            <div>
                                <h4 class="profileSubHeading">{item}</h4>
                                <p class="profileInformation">{profileSubValues.at(i)}</p>
                            </div>
                            {popup ? <div class="popup">
                                <center><h2>Update Profile</h2></center>
                                <hr></hr>
                                <div class="popupOptions">
                                    <h4 class="profileSubHeading">Full Name</h4>
                                    <input class="namePopup" value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div class="popupOptions">
                                    <h4 class="profileSubHeading">Email Address</h4>
                                    <input class="emailPopup" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div class="popupOptions">
                                    <h4 class="profileSubHeading">Mobile Number</h4>
                                    <input class="mobilePopup" value="+918233474646"></input>
                                </div>
                                <div class="popupOptions">
                                    <h4 class="profileSubHeading">Address</h4>
                                    <input class="addressPopup" value="104, Patel Marg, Delhi, India (302006)"></input>
                                </div>
                                <div class="popupButtons">
                                    <p onClick={closePopup}>Cancel</p>
                                    <p onClick={updateSubmit}>Save</p>
                                </div>
                            </div> : ""}
                        </div>
                        
                    ))}
                    </div>
                    <div onClick={handleOpenPopup} class="editButton">Edit</div>
                    <div onClick={onClickUpdatePassword} class="updatePasswordButton">Change Password</div>
                    {/* <Faqs/> */}
                </div>
                <Footer/>
            </div>
            )}
        </div>
    )
}

export default EditProfile;

function Faqs(){
    return(
        <div>
            <h2>FAQs</h2>
            <p><b>What happens when I update my email address (or mobile number)?</b></p>
            <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
            <p><b>hen will my Flipkart account be updated with the new email address (or mobile number)?</b></p>
            <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
            <p><b>What happens to my existing Flipkart account when I update my email address (or mobile number)?</b></p>
            <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
        </div>
    )
}