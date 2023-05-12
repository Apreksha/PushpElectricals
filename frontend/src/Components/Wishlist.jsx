import React from "react";
import './Wishlist.css';
import Header from "./Header";
import Footer from "./Footer";
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import star from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/star.png";

function Wishlist(){
    const totalWishlistCount = 150;
    return(
        <div>
            <div class="wishlist">
                <Header/>
                <div class="wishlistLists">
                    <h3>My Wishlist ({totalWishlistCount})</h3>
                    <hr></hr>
                    <div class="wishlistItemsList">
                        <div class="wishlistItemCard">
                            <div class="aboutProduct">
                                <img src={img1}></img>
                                <div class="productInfo">
                                    <p>SYSKA 9W B22 6500K Cool Day Light Inverter Rechargeable Emergency Led Bulb</p>
                                    <div class="rating">
                                        <p>3.3</p>
                                        <img src={star}></img>
                                    </div>
                                    <h2>₹499</h2>
                                </div>
                            </div>
                            <div class="buttonOptions">
                                <div>Add to Cart</div>
                                <div>Delete</div>    
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Wishlist;