import React, {useEffect, useState} from "react";
import Header from "./Header";
import './UpdatePassword.css';
import { UPDATE_PASSWORD_RESET } from "../Constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from "../Actions/userAction";
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import { useAlert } from "react-alert";

function UpdatePassword(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, isUpdated, loading} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => {        
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Password Changed Successfully!");
            navigate("/account/profile");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, alert, error, isUpdated]);

    const updatePasswordSubmit = (e) => {
        e.preventDefault(); 
        dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
    }

    return(
        <div>
            <div>
                <Header/>
                <div>
                    <input class="passwordField" value={oldPassword} type="password" onChange={(e) => setOldPassword(e.target.value)}></input>
                    <input class="passwordField" value={newPassword} type="password" onChange={(e) => setNewPassword(e.target.value)}></input>
                    <input class="passwordField" value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <div class="updatePasswordButton" onClick={updatePasswordSubmit}>Update Password</div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword;