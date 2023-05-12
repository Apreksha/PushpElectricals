import React, { Component } from "react";
import './Footer.css';
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import pe_banner from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/pe_banner.png";

function Footer(){
    let navigate = useNavigate();

    const onClickAbout = () => {
        navigate("/about");
    };

    const onClickMyOrders = () => {
        navigate("/account/orders");
    };

    const onClickProfile = () => {
        navigate("/account/profile");
    };

    return(
        <div class="footer">
            <img class="pe_banner" src={pe_banner}></img>
            <div class="subHeadings">
                <h6 class="footerPartHeading">Menu</h6>
                <p onClick={onClickAbout}>About Us</p>
                <p onClick={onClickMyOrders}>View Orders</p>
                <p onClick={onClickProfile}>View Account</p>
            </div>
            {/* <div>
                <h6 class="footerPartHeading">Contact Us</h6>
                <p>Mon - Sun: 08:00 - 21:00</p>
                <div class="callUs">Give us a call</div>
            </div> */}
        </div>
    )
}

export default Footer;