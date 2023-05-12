import React, { useEffect, useState } from "react";
import './Login.css';
import Loader from "./Loader";
import { Route, Routes, useNavigate, withRouter, useHistory } from 'react-router-dom';
import facebook from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/facebook.png";
import google from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/google.png";
import pe from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/pe.png";
import emailImg from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/email.png";
import passwordImg from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/password.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/Actions/userAction";
import { useAlert } from "react-alert";
import { GoogleLogin } from 'react-google-login';   

function Login(){
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, isAuthenticated, googleUser} = useSelector((state) => state.user);
    
    const onClickHome = () => {
        navigate("/");
    };

    const onClickForgotPassword = () => {
        navigate("/password/forgot");
    };

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID Token:" + response.credential);
    }

    
    /*useEffect(() => {
        google.accounts.id.initialize({
            client_id: "348443964088-0eb6jbb7i6n4fpog0inplgrk2dt3gpls.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementsById("signInWithGoogle"),
        );
    }, []); */

    useEffect(() => {
        /*function start() {
            gapi.client.init({
                client_id: "348443964088-0eb6jbb7i6n4fpog0inplgrk2dt3gpls.apps.googleusercontent.com",
                scope:""
            })
        };

        gapi.load('client:auth2', start);*/
        /* google.accounts.id.initialize({
            client_id: "348443964088-0eb6jbb7i6n4fpog0inplgrk2dt3gpls.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementsById("signInWithGoogle"),
        ); */

        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }

        if(isAuthenticated || googleUser){
            navigate("/account/profile");
        }

    }, [dispatch, error, alert, isAuthenticated, googleUser]);

    //var accessToken = gapi.auth.getToken().access_token;

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const googleOnClick = () => { 
        window.open("http://localhost:8000/auth/google", "_self")
    }

    const facebookOnClick = () => { 
        window.open("http://localhost:8000/auth/facebook", "_self")
    }

    return(
        <div class="login">
            {loading ? <Loader/> : 
            <div class="signIn">
                <div onClick={onClickHome} class="logoandname">
                    <img src={pe}></img>
                    <h1>PUSHP ELECTRICALS</h1>
                </div>
                <h2>Sign in to Account</h2>
                <hr></hr>
                <div class="signInWith">
                    <img src={facebook} onClick={facebookOnClick}></img>
                    <img class="signInWithGoogle" src={google} onClick={googleOnClick}></img>
                </div>
                <p>or use your email account</p>
                <div class="inputFields">
                    <img src={emailImg}></img>
                    <input required placeholder="Email" type='email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                </div>
                <div class="inputFields">
                    <img src={passwordImg}></img>
                    <input required placeholder="Password" type='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
                </div>
                <h5 onClick={onClickForgotPassword} class="forgotPasswordButton">Forgot Password?</h5>
                <div onClick={loginSubmit} class="signInButton">Sign In</div>
            </div>
            }
            <SignupOption/>
            
        </div>
    )
}

export default Login;

function SignupOption(){
    let navigate = useNavigate();
    
    const onClickRegister = () => {
        navigate("/register");
    };

    return (
        <div class="optionForSignUp">
            <h2>Welcome</h2>
            <hr></hr>
            <p>Sign up and start your journey with us</p>
            <div onClick={onClickRegister} class="signUpButton">Sign Up</div>
        </div>
    )
}