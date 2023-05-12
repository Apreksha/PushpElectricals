import React, { Component, useEffect, useState } from "react";
import './Services.css';
import delivery from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/delivery.png";
import card from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/card.png";
import onlineSupport from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/onlineSupport.png";

function Services(){
    return(
        <div class="services">
            <h2>Services To Help You Shop</h2>
            <div class="allServices">
                <div class="serviceTypes">
                    <img src={onlineSupport}></img>
                    <div>
                        <p class="serviceHeading">24/7 Online Support</p>
                        <p class="serviceDescription">Online support available all day</p>
                    </div>
                </div>
                <div class="serviceTypes">
                    <img src={delivery}></img>
                    <div>
                        <p class="serviceHeading">Fast Delivery</p>
                        <p class="serviceDescription">Fast shipment at great prices</p>
                    </div>
                </div>
                <div class="serviceTypes">
                    <img src={card}></img>
                    <div>
                        <p class="serviceHeading">Fast Checkout</p>
                        <p class="serviceDescription">Easy and fast checkout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;