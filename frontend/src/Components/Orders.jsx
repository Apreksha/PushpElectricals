import React from "react";
import './Orders.css';
import Header from "./Header";
import Footer from "./Footer";
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";

function Orders(){
    return(
        <div>
            <div class="orders">
                <Header/>
                <div class="orderLists">
                    <h2>Your Orders</h2>
                    <div class="orderItemsList">
                        <div class="orderItemCard">
                            <div class="aboutProduct">
                                <img src={img1}></img>
                                <div class="productInfo">
                                    <p>SYSKA 9W B22 6500K Cool Day Light Inverter Rechargeable Emergency Led Bulb</p>
                                    <h2>₹499</h2>
                                    <div class="buttonOptions">
                                        <div>Add to Cart</div>
                                        <div>Delete</div>    
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Ordered on 26 February 2023</p>
                                <p>Delivered on 26 February 2023</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="orderItemCard">
                            <div class="aboutProduct">
                                <img src={img1}></img>
                                <div class="productInfo">
                                    <p>SYSKA 9W B22 6500K Cool Day Light Inverter Rechargeable Emergency Led Bulb</p>
                                    <h2>₹499</h2>
                                    <div class="buttonOptions">
                                        <div>Add to Cart</div>
                                        <div>Delete</div>    
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Ordered on 26 February 2023</p>
                                <p>Delivered on 26 February 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Orders;