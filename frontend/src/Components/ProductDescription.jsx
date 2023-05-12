import React, { Component, useEffect, useState } from "react";
import './ProductDescription.css';
import Loader from "./Loader";
import Header from './Header';
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.jpg";
import minus from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/minus.png";
import plus from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/plus.png";
import delivery from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/delivery.png";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../Actions/productActions";
import Carousel from "react-material-ui-carousel";
import Footer from "./Footer";
import { addItemsToCart } from "../Actions/cartActions";
import { useAlert } from "react-alert";
import { Rating } from "@material-ui/lab";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";

function ProductDescription(props){
    const {id} = useParams();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    //const alert = useAlert();

    useEffect(() => {
        /*if(error){
            alert.error(error);
            dispatch(clearErrors());
        }*/
        dispatch(getProductDetails(id))
    }, [dispatch, id]);
    
    const {product, loading, error} = useSelector(state => state.productDetails);
    const [quantity, setQuantity] = useState(1);
    //console.log(product.technicalDetails[0][0]);
    //console.log(product.ratings);
    const name = product.name;
    const image = product.images[0];

    const options = {
        size: "small",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    
    const increaseQuantity = () => {
        if(quantity == 10)
            return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if(quantity == 1)
            return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        //alert.success("Item Added To Cart");
        navigate('/cart');
    };

    return(
        <div>{loading ? <Loader/> : ( 
            <div>
                <Header/>
                <div class="productDetails">
                    <div class="productDescription">
                        {/* <p>{product.name}</p> */}
                        {/* <Carousel>
                            {product.images && product.images.map((item, i) => (
                                <img class="mainImg" key={item.url} src={item.url} alt={`${i} Slide`}/>
                            ))}
                        </Carousel> */}  
                        
                        <div class="imageAndDescription">
                            <div class="mainImgBox"><img class="mainImg" src={image}></img></div>
                            <div class="description">
                                <h2>{name}</h2>
                                <Rating {...options} />
                                <hr></hr>
                                <p>₹{product.price}</p>
                                <hr></hr>
                                <div class="freeDelivery">
                                    <img src={delivery}></img>
                                    <p>Free Delivery / 1-2 Days</p>
                                </div>
                                {/* <p>Select Color: Blue</p> */}
                                {/* <div class="imgChoices">
                                    <img src={product.images[0].url}></img>
                                    <img src={img1}></img>
                                    <img src={img1}></img>
                                </div> */}
                                <div class="qty">
                                    <div onClick={decreaseQuantity}><Remove/></div>
                                    <p value={quantity}>{quantity}</p>
                                    <div onClick={increaseQuantity}><Add/></div>
                                </div>
                                <div class="booking">
                                    <div class="save">Buy Now</div>
                                    <div onClick={addToCartHandler} class="addToCart">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1>Product Overview</h1>
                    <ProductOverview description = {product.description} technicalDetails = {product.technicalDetails}/>
                </div>
                <Footer/>
            </div>
            )}
        </div>
    )
}

export default ProductDescription;

function ProductOverview(props){
    return(
        <div class="productOverview">
            <h2>Description</h2>
            <div>
                {props.description.map((item, i) => (
                    <li>{item}</li>
                ))}
            </div>
            <div>
                <h2>Weights & Materials</h2>
                <table>{props.technicalDetails.map((item, i) => (
                    <tr>
                        <td>{props.technicalDetails[i][0]}</td>
                        <td>{props.technicalDetails[i][1]}</td>
                    </tr>
                ))}
                </table> 
            </div>
            {/* <div>
                <h4>Delivery & Returns</h4>
            </div>
            <div>
                <h4>Reviews</h4>
            </div> */}
        </div>
    )
}