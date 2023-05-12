import React, { useState, useEffect } from "react";
import './Signup.css';
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import pe from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/pe.png";
import emailImg from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/email.png";
import call from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/call.png";
import passwordImg from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/password.png";
import person from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/person.png";
import {clearErrors, register } from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/Actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";

function Signup(){ 
    let navigate = useNavigate();
    
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated, googleUser} = useSelector((state) => state.user);

    useEffect(() => {
        if(error){
            //alert.error(error);
            dispatch(clearErrors);
        }

        if(isAuthenticated || googleUser){
            navigate("/account");
        }

    }, [dispatch, error, isAuthenticated, googleUser]);

    const [name, setRegisterName] = useState("");
    const [email, setRegisterEmail] = useState("");
    const [password, setRegisterPassword] = useState("");

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }

    return(
        <div class="signUp">
            <div class="signup">
                <div class="logoandname">
                    <img src={pe}></img>
                    <h1>PUSHP ELECTRICALS</h1>
                </div>
                <h2>Create new account</h2>
                <hr></hr>
                <div class="inputFields">
                    <img src={person}></img>
                    <input required placeholder="Name" type='name' value={name} onChange={(e) => setRegisterName(e.target.value)}></input>
                </div>
                <div class="inputFields">
                    <img src={emailImg}></img>
                    <input placeholder="Email" type='email' value={email} onChange={(e) => setRegisterEmail(e.target.value)}></input>
                </div>
                <div class="inputFields">
                    <img src={call}></img>
                    <input placeholder="Contact No." type='phone'></input>
                </div>
                <div class="inputFields">
                    <img src={passwordImg}></img>
                    <input placeholder="Password" type='password' value={password} onChange={(e) => setRegisterPassword(e.target.value)}></input>
                </div>
                <div class="signUpButton" onClick={registerSubmit}>Sign Up</div>
            </div>
            <SigninOption/>
        </div>
    )
}

export default Signup;

function SigninOption(){
    let navigate = useNavigate();
    
    const onClickLogin = () => {
        navigate("/login");
    };
    
    return (
        <div class="optionForSignin">
            <h2>Welcome back!</h2>
            <hr></hr>
            <p>Already have an account?<br></br>Sign in and continue.</p>
            <div onClick={onClickLogin} class="signInButton">Sign In</div>
        </div>
    )
}