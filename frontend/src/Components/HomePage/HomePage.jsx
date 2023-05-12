import React, { Component, useEffect, useState } from "react";
import './HomePage.css';
import arrow from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/arrow.png";
import trimmer from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/trimmer.png";
import ironHomePage from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/ironHomePage.png";
import fan from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/fan.png";
import bulbs from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/bulbs.png";
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import Header from "../Header";
import Footer from "../Footer";
import MainBanner from "./MainBanner";
import ShopTopCategories from "./ShopTopCategories";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import Services from "./Services";
import FeaturedBrands from "./FeaturedBrands";

function HomePage(){
    return(
        <div>
            <div class="homePage">
                <Header/>
                {/* <MainBanner/> */}
                <ShopTopCategories  />
                {/* <TopCategoriesAndProducts/> */}
                <Services/>
                <FeaturedBrands/>
                {/* <Bestsellers/> */}
            </div>
            <Footer/>
        </div>
    )
}

export default HomePage;

function TopCategoriesAndProducts(){
    const someCategories = ['Bulbs', 'Fans', 'Tubelight','Geyser', 'Hand Blender', 'Room Heater', 'Iron', 'Decorative Lights'];

    return (
        <div class="topCategoriesAndProducts">
                <div class="someCategories">{someCategories.map((item, i) => (
                    <p>{item}</p>
                ))}
                </div>
                <div class="colourBanners">
                    <div class="blueBanner">
                        <img src={bulbs}></img>
                        <p>ALL TYPES OF BULBS AVAILABLE</p>
                    </div>
                    <div class="topProducts">
                        <div>
                            <p>BEST TRIMMERS</p>
                            <img src={trimmer}></img>
                        </div>
                        <div>
                            <p>IRONS</p>
                            <img src={ironHomePage}></img>
                        </div>
                        <div>
                            <p>LEADING BRANDS ON FANS</p>
                            <img src={fan}></img>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function Bestsellers(){
    //const {product, loading, error} = useSelector(state => state.productDetails);
    
    return(
        <div class="bestSellers">
            <h2>Bestsellers</h2>
            <div class="bestsellerProducts">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    )
}