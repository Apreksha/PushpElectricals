import React, { Component, useState } from "react";
import axios from "axios";
import './Cart.css';
import Header from './Header';
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import call from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/call.png";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../Actions/cartActions";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Footer from "./Footer";

function Cart({googleUser}){
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {cartItems} = useSelector((state) => state.cart);
    const amount = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const {user, isAuthenticated, loading} = useSelector(state => state.user);
    const increaseQuantity = (id, quantity) => {
        if(quantity == 10)
            return;
        const qty = quantity + 1;
        dispatch(addItemsToCart(id, qty));
    };

    const decreaseQuantity = (id, quantity) => {
        if(quantity == 1)
            return;
        const qty = quantity - 1;
        dispatch(addItemsToCart(id, qty));
    };

    const deleteCartItems = (id) =>{
        console.log('clicked');
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <div class="cartScreen">
            <Header/>
            <div class="Cart">
                <p class="heading">My Cart</p>

            {/* <div>{(isAuthenticated || googleUser) ?  */}
                <div>{cartItems.length === 0 ? "no items" :
                    <div class="cart">
                        <div class="cartItemsList">{cartItems && cartItems.map((item) => (
                            <div class="card">
                                <div class="cartItemMainImg">
                                    <img src={item.image}></img>
                                </div>
                                <div class="info1">
                                    <div>
                                        <p>{item.name}</p>
                                        <div class="qty">
                                            <div onClick={() => decreaseQuantity(item.product, item.quantity)}><Remove/></div>
                                            <p>{item.quantity}</p>
                                            <div onClick={() => increaseQuantity(item.product, item.quantity)}><Add/></div>
                                        </div>
                                    </div>
                                    <p onClick={() => deleteCartItems(item.product)}>Remove</p>
                                </div>
                                <div class="info2">
                                    <p>₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                        
                        <div class="bill">
                            <div class="billing">
                                <div class="subtotal">
                                    <p>Subtotal</p>
                                    <p>₹{amount}</p>
                                </div>
                                <div class="deliveryCharge">
                                    <p>Delivery Charges</p>
                                    <p>Free</p>
                                </div>
                                <hr></hr>
                                <div class="total">
                                    <p>Total Amount</p>
                                    <p>₹{amount}</p>
                                    
                                </div>
                            </div>
                            <div class="proceedToCheckout" onClick={checkoutHandler}>Proceed to Checkout</div>
                            <div class="help">
                                <img src={call}></img>
                                <div class="helpContent">
                                    <h4>Customer Service</h4>
                                    <p>Have questions before you check out?</p>
                                    <p>We're here to help!</p>
                                </div>
                            </div>
                                <button class="callUs">Call Us</button>
                            </div>
                        </div> }
                    </div>
                {/* : <div>please login</div>}</div> */}
            </div>
            <Footer/>
        </div>
    )
}

export default Cart;