import React, { Component } from "react";
import './ShopTopCategories.css';
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import roomheater from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/roomheater.png";
import fan from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/fan.png";
import geyser from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/geyser.png";
import tubelight from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/tubelight.png";
import handBlender from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/handBlender.png";

function ShopTopCategories(){
    const topCategories = ['Bulbs', 'Fans', 'Tubelight','Geyser', 'Hand Blender', 'Room Heater'];
    const topCategoriesImg = [img1, fan, tubelight, geyser, handBlender, roomheater];

    return(
        <div class="shopTopCategories">
            <h2>Shop Our Top Categories</h2>
            <div class="listOfTopCategories">{topCategoriesImg.map((item, i) => (
                <div class="topCategoriesCard">
                    <img src={item}></img>
                    <p>{topCategories.at(i)}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ShopTopCategories;