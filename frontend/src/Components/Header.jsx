import React, { Component, useState } from "react";
import './Header.css';
import {Route, Routes, useNavigate, withRouter, useHistory} from 'react-router-dom';
import cart from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/cart.png";
import profile from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/profile.png";
import fav from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/fav.png";
import peLogo from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/peLogo.png";
import search from "D:/VSCodeProjects/pushpElectricals/pushp_electricals/frontend/src/image/search.png";
import {useAlert} from "react-alert";
import {useSelector, useDispatch} from "react-redux";
import { logout } from "../Actions/userAction";
import Person from "@material-ui/icons/Person";
import Favorite from "@material-ui/icons/Favorite";
import Logout from "@material-ui/icons/ExitToApp";
import Receipt from "@material-ui/icons/Receipt"; 
import ShoppingCart from "@material-ui/icons/ShoppingCart"; 

function Header(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { isAuthenticated, googleUser } = useSelector((state) => state.user);

    const onClickCart = () => {
        navigate("/cart");
    };

    const onClickCategories = () => {
        navigate("/categories");
    };

    const onClickHome = () => {
        navigate("/");
    };

    const onClickWishlist = () => {
        navigate("/account/wishlist");
    };
    
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
    };
    
    return (
        <div class="header">
          <div class="logoAndCategories">
            <img onClick={onClickHome} src={peLogo}></img>
            <p onClick={onClickCategories}>Categories</p>
          </div>
          
          <div class="searchBarAndProfile">
            <form onSubmit={searchSubmitHandler}>
              <input type="text" placeholder="Search a Product..." onChange={(e) => setKeyword(e.target.value)}/>
            </form>
            
            <Profile/>
            <div onClick={onClickCart} class="shoppingCartIcon">
              <ShoppingCart/>
              <p>Cart</p>
            </div>

          </div>
        </div>
    ) 
}

export default Header;

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <p onClick={props.click}> {props.text} </p>
    </li>
  );
}

function Profile() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onClickOrders = () => {
    navigate("/account/orders");
  };

  const onClickWishlist = () => {
    navigate("/account/wishlist");
  };

  function logoutUser(){
    dispatch(logout());
    navigate("/login");
    alert.success("Logout Successfully");
  }

  const onClickEditProfile = () => {
    navigate("/account/profile");
  };

  return <div className='menu-container' >
    <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
      <p>Apreksha</p>
    </div>

    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
      <ul>
        <div class='dropdownitem'>
          <Person/>
          <DropdownItem click = {onClickEditProfile} text = {"My Profile"}/>
        </div>
        <hr></hr>
        <div class='dropdownitem'>
          <Receipt/>
          <DropdownItem click = {onClickOrders} text = {"View Orders"}/>
        </div>
        {/* <hr></hr>
        <div class='dropdownitem'>
          <Favorite/>
          <DropdownItem click = {onClickWishlist} text = {"Wishlist"}/>
        </div> */}
        <hr></hr>
        <div class='dropdownitem'>
          <Logout/>
          <DropdownItem click = {logoutUser} text = {"Logout"}/>
        </div>
      </ul>
    </div>
  </div>
}