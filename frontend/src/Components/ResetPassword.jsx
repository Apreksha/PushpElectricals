import React, { Component, useEffect, useState } from "react";
import './ForgotPassword.css';
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, forgotPassword } from "../Actions/userAction";

function ResetPassword(){
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, message} = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {        
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message){
            alert.success(message);
        }
    }, [dispatch, alert, message]);

    return(
        <div>
            <Header/>
            <div>
                <h1>Forgot Password</h1>
                <h2>Enter Email</h2>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <p onClick={forgotPasswordSubmit}>send</p>
            </div>

        </div>
    )
}

export default ResetPassword;