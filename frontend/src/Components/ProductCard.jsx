import React, { Component, useEffect, useState } from "react";
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import './ProductCard.css';
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img.png";
import { Rating } from "@material-ui/lab";

function ProductCard({rating, name, img, price, handle}){
    let navigate = useNavigate();
    const onClickProduct = () => {
        navigate(handle);
    };

    const options = {
        size: "small",
        value: rating,//product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return(
        <div onClick={onClickProduct} class="productCard">
            <div class="productImage">
                <img src={img}></img>
            </div>
            <div class="productCardNameAndPrice">
                <p>{name}</p>
                <p>₹{price}</p>
            </div>
            <Rating {...options} />
            {/* <div class="productCartAddToCartButton">Add to Cart</div> */}
        </div>
    )
}

export default ProductCard;