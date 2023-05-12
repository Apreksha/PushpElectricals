import React, { Component } from "react";
import './Categories.css';
import Footer from "./Footer";
import Header from "./Header";
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import iron from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/iron.jpg";
import trimmer from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/trimmer.png";
import fan from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/fan.png";
import geyser from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/geyser.png";
import tubelight from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/tubelight.png";
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import roomheater from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/roomheater.png";
import doorbell from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/doorbell.png";
import torch from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/torch.png";
import tableLamp from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/tableLamp.png";
import handBlender from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/handBlender.png";
import imersionRods from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/imersionRods.png";
import monoblockPumps from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/monoblockPumps.png";
import accessories from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/accessories.png";
import extensionCords from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/extensionCords.png";
import decorativeLights from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/decorativeLights.jpg";

function Categories(){
    const categories = ['Bulbs', 'Fans', 'Tubelights', 'Geyser', 'Hand Blender', 'Room Heater', 'Iron', 'Trimmers', 'Door bell', 'Table Lamp', 'Imersion Rods', 'Extension Cords', 'Monoblock Pumps', 'Decorative Lights', 'Other Accessories'];
    const categoriesImg = [img1, fan, tubelight, geyser, handBlender, roomheater, iron, trimmer, doorbell, tableLamp, imersionRods, extensionCords, monoblockPumps, decorativeLights, accessories];

    let navigate = useNavigate();

    const clickOnBulbs = (category) => {
        navigate(`/products/${category}`);
    };

    return(
        <div>
            {/* {loading ? <Loader/> : ( */}
            <div>
                <Header/>
                <div class="categoriesScreen">
                    <h2>Shop By Category</h2>
                    <div class="categories">{categories.map((item, i) => (
                        <div onClick={() => {clickOnBulbs(item)}}>
                            <img src={categoriesImg.at(i)}></img>
                            <p>{item}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <Footer/>
            {/* )} */}
        </div>
    )
}

export default Categories;