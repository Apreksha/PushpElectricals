import React, { Component, useEffect, useState } from "react";
import './ProductList.css';
import img1 from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/img1.png";
import delivery from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/delivery.png";
import arrow from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/arrow.png";
import Header from "./Header";
import Footer from "./Footer";
import {getCategoryProduct, getProduct} from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/Actions/productActions.js";
import {Link, useParams } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Loader from "./Loader";
//import {useAlert} from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import ProductCard from "./ProductCard";
import Typography from "@material-ui/core/Typography";

const brands = ["Philips", "Syska", "Crompton", "Havells", "Halonix"];

function ProductList(props){
    const dispatch = useDispatch();
    //const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [brand, setBrand] = useState("");
    const [ratings, setRatings] = useState(0);

    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount} = 
        useSelector((state) => state.products);

    const {keyword} = useParams();

    const setCurrentPageNo = (e) =>     {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        /*if(error){
            return alert.error(error);
        }*/
        dispatch(getProduct(keyword, currentPage, price, brand, ratings));
        dispatch(getCategoryProduct(props.category));
        
    }, [dispatch, keyword, currentPage, price, brand, ratings]);    

    let count = filteredProductsCount;

    return(
        <div>
            {loading ? <Loader/> : ( 
                <div>
                <Header/>
                    <div class="productList">
                        <p class="heading">{props.category}</p>
                        <p class="count">{count} items found in this category</p>
                        {/* sort and filter option */}     

                        {/* <div class="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value = {price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />
                        </div>

                        <Typography>Brands
                            <ul class="BrandBox">
                                {brands.map((brand) => (
                                    <li 
                                        class="brand-link"
                                        key={brand}
                                        onClick={() => setBrand(brand)}>
                                        {brand}
                                        </li>
                                ))}
                            </ul>
                        </Typography>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value = {ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="radio_label"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset> */}


                        
                        <div class="allProducts">
                            {products && products.map(product => (
                                <ProductCard handle={`/product/${product._id}`} rating = {product.ratings} name={product.name} price={product.price} img={product.images[0]}/>
                            ))} 
                        </div>

                        {/* page numbers and other pages */}
                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}

                        <p class="relatedSearchesHeading">Related Searches</p>
                        <div class="relatedSearches">
                            <div>
                                <p>Tube Lights</p>
                                <img src={arrow}></img>
                            </div>
                            <div>
                                <p>Decorative Lights</p>
                                <img src={arrow}></img>
                            </div>
                            <div>
                                <p>Table Lamps</p>
                                <img src={arrow}></img>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </div>
    )
}

export default ProductList;

function ItemCards({product}){
    return(
        <Link to={`/product/${product._id}`}>
            <div class="itemCard">
                <img class="productImg" src={product.images[0].url}></img>
                <p class="itemName">{product.name}</p>
                <p class="price">{`₹${product.price}`}</p>
                <div class="freeDelivery">
                    <img src={delivery}></img>
                    <p>Free Delivery / 1-2 Days</p>
                </div>
            </div>
        </Link>
    )
}