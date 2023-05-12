import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Checkout.css';
import axios from "axios";
import Header from './Header';
import Footer from "./Footer";
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.jpg";
import { clearErrors, createOrder } from "../Actions/orderActions";
import { saveShippingInfo } from "../Actions/cartActions";
import { useAlert } from "react-alert";
import { removeItemsFromCart } from "../Actions/cartActions";

function Checkout(){
    const dispatch = useDispatch();
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPinCode] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState('');
    const alert = useAlert();
    const {error} = useSelector((state) => state.newOrder);

    const amount = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const deleteCartItems = (id) =>{
        console.log('clicked');
        dispatch(removeItemsFromCart(id));
    }

    const shippingSubmit = (e) => {
        e.preventDefault();
        console.log('i');
        /* if (contact.length < 10 || contact.length > 10) {
          alert.error("Contact Number should be 10 digits Long");
          return;
        } */
        dispatch(
          saveShippingInfo({ address, city, state, country, pincode, contact })
        );
      };

    const order = {
        shippingInfo, 
        orderItems: cartItems, 
        itemsPrice: amount, 
        taxPrice: 0, 
        shippingPrice: 0, 
        totalPrice: amount
    }

    const payNowHandler = async() => {
        //shippingInfo.address = address;
        const {data: {key}} = await axios.get("http://localhost:8000/api/v1/getkey");
        /* const {data: {order}} = await axios.post("http://localhost:8000/api/v1/checkout", {
            amount
        }); */

        const options = {
            key,
            amount: order.totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Pushp Electricals",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: "http://localhost:8000/api/v1/paymentverification",
            prefill: {
                "name": "",
                "email": "",
                "contact": ""
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };

        var razor = new window.Razorpay(options);
        razor.open(); 
        dispatch(createOrder(order));
        cartItems.reduce((item) => deleteCartItems(item.product));
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    return(
        <div>
            <Header/>
            <div class="checkout">
                <div class="reviewItemAndShippingAddress">
                    <div class="reviewItem">
                        <h2>Review Item and Shipping</h2>
                        <div>{cartItems && cartItems.map((item) => (
                            <div class="checkoutProductDetails">
                                <div class="checkoutProductImg"><img src={item.image}></img></div>
                                <p class="checkoutProductName">{item.name}</p>
                                <div>
                                    <p class="checkoutProductPrice">₹{item.price * item.quantity}</p>
                                    <p class="checkoutProductQty">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div class="deliveryInformation">
                        <div class="delivery">
                            <h2>Delivery Information</h2>
                            <div class="saveInformation" onClick={shippingSubmit}>Save Information</div>
                        </div>
                        <div class="personalDetails">
                            <div>
                                <p>First Name*</p>
                                <input required placeholder="First Name" type='name'></input>
                            </div>
                            <div>
                                <p>Last Name*</p>
                                <input required placeholder="Last Name" type='name'></input>
                            </div>
                        </div>
                        <div class="personalDetails">
                            <div>
                                <p>Address*</p>
                                <input required placeholder="Address" type='text' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="personalDetails">
                            <div>
                                <p>City/Town*</p>
                                <input required placeholder="City/Town" type='text' value={city} onChange={(e) => setCity(e.target.value)}></input>
                            </div>
                            <div>
                                <p>State*</p>
                                <input required placeholder="State" type='text' value={state} onChange={(e) => setState(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="personalDetails">
                            <div>
                                <p>Country*</p>
                                <input required placeholder="Country" value={country} type="text" onChange={(e) => setCountry(e.target.value)}></input>
                            </div>
                            <div>
                                <p>Pin Code*</p>
                                <input required placeholder="Pin Code" value={pincode} type="number" onChange={(e) => setPinCode(e.target.value)}></input>
                            </div>
                        </div>
                        <div class="personalDetails">
                            <div>
                                <p>Mobile*</p>
                                <input required placeholder="Mobile" type='number' value={contact} onChange={(e) => setContact(e.target.value)} size="10"></input>
                            </div>
                            <div>
                                <p>Email*</p>
                                <input required placeholder="Email" type='email'></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="orderSummary">
                    <h2>Order Summary</h2>
                    <div >
                        <div class="checkoutSubtotal">
                            <p>Subtotal</p>
                            <p>₹{amount}</p>
                        </div>
                        <div class="checkoutDeliveryCharge">
                            <p>Delivery Charges</p>
                            <p>Free</p>
                        </div>
                        
                        <div class="checkoutTotal">
                            <p>Total Amount</p>
                            <p>₹{amount}</p>        
                        </div>
                    </div>
                    <input type="radio" value="OnlinePayment" name="gender" /> Online Payment
                    <br></br>
                    <input type="radio" value="COD" name="gender" /> Cash on Delivery
                    <div class="payNow" onClick={payNowHandler}>Pay ₹{amount}</div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Checkout;