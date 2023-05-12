import React, { Component } from "react";
import './MainBanner.css';
import banner from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/banner.jpg";

function MainBanner(){
    return(
        <div class="mainBanner">
            <img src={banner}></img>
            {/* <p>One Stop For All Electricals Products</p> */}
        </div>
    )
}

export default MainBanner;