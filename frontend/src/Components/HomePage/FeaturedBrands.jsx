import React, { Component, useEffect, useState } from "react";
import './FeaturedBrands.css';
import cromptonGreaves from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/cromptonGreaves.png";
import bajaj from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/bajaj.png";
import usha from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/usha.png";
import philips from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/philips.png";
import syska from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/syska.png";

function FeaturedBrands(){
    const brandLogo = [cromptonGreaves, philips, bajaj, usha, syska];
    return (
        <div class="featuredBrands">
            <h2>Featured Brands</h2>
            <div class="nameOfBrands"> {brandLogo.map((item, i) => (
                <div class="brand"><img src={item}></img></div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedBrands;