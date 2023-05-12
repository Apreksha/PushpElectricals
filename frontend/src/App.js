import './App.css';
import React, { useState, useEffect } from "react";
import HomePage from './Components/HomePage/HomePage';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Categories from './Components/Categories';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ProductDescription from './Components/ProductDescription';
import Orders from './Components/Orders';
import Wishlist from './Components/Wishlist';
import About from './Components/About';
import Contact from './Components/Contact';
import ForgotPassword from './Components/ForgotPassword';
import EditProfile from './Components/EditProfile';
import Search from './Components/Search';
import Signup from './Components/Signup';
import store from "./store";
import { loadUser } from './Actions/userAction';
import { useSelector } from "react-redux";
import ResetPassword from './Components/ResetPassword';
import UpdatePassword from './Components/UpdatePassword';
import PaymentSuccess from './Components/PaymentSuccess';
import Checkout from './Components/Checkout';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [ googleUser, setGoogleUser ] = useState(null);

  useEffect(() => {
    //store.dispatch(loadUser());
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        //credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Access-Control-Allow-Credentials": true 
        }
      }).then(response => {
        if(response.status === 200){
          return response.json();
        }
        throw new Error("authentication has been failed!");
      }).then(resObject => {
        setGoogleUser(resObject.user)
      }).catch(err => {
        console.log(err);
      })
    };
    getUser();
  }, [googleUser]);

  //console.log(googleUser); 

  return (
    <div>
      <div className="App">
        {/* <ProductList/> */}
        <Router>
          <Routes>
            {/* {isAuthenticated || googleUser} */}
            <Route path="/" element={<HomePage/>} exact />
            <Route path="/password/forgot" element={<ForgotPassword/>} exact />
            <Route path="/product/:id" element={<ProductDescription/>} exact  />  
            <Route path="/password/reset/:token" element={<ResetPassword/>} exact  />  
            <Route path="/products" element={<ProductList/>} exact />  
            <Route path="/products/bulbs" element={<ProductList category="Bulbs"/>} exact />
            <Route path="/products/Hand Blender" element={<ProductList category="Hand Blender"/>} exact />
            <Route path="/products/Geyser" element={<ProductList category="Geyser"/>} exact />
            <Route path="/products/Fans" element={<ProductList category="Fans"/>} exact />
            <Route path="/products/Tubelights" element={<ProductList category="Tubelights"/>} exact />
            <Route path="/products/Iron" element={<ProductList category="Iron"/>} exact />
            <Route path="/products/Room Heater" element={<ProductList category="Room Heater"/>} exact />
            <Route path="/products/Trimmers" element={<ProductList category="Trimmers"/>} exact />
            <Route path="/products/Door bell" element={<ProductList category="Door bell"/>} exact />
            <Route path="/products/Table Lamp" element={<ProductList category="Table Lamp"/>} exact />
            <Route path="/register" element={<Signup/>} exact />  
            <Route path="/login" element={<Login/>} exact />  
            <Route path="/password/update" element={<UpdatePassword/>} exact />  
            <Route path="/products/:keyword" element={<ProductList/>}/>  
            <Route path="/account/orders" element={<Orders/>} exact />
            {/* <Route path="/account/orders" element={(isAuthenticated || googleUser) ? <Orders/> : <Login/>} exact /> */}
            <Route path="/account/profile" element={(isAuthenticated || googleUser) ? <EditProfile googleUser={googleUser}/> : <Navigate to="/login"/>} exact />
            <Route path="/contactUs" element={<Contact/>} exact />
            <Route path="/about" element={<About/>} exact />
            <Route path="/account/wishlist" element={<Wishlist/>} exact />
            <Route path="/paymentsuccess" element={<PaymentSuccess/>} exact />
            <Route path="/checkout" element={<Checkout/>} exact />
            {/* <Route path="/cart" element={<Cart/>}{(isAuthenticated || googleUser) ? <Cart googleUser={googleUser}/> : <Navigate to="/login"/>} exact /> */}
            <Route path="/cart" element={<Cart/>} exact />
            <Route path="/categories" element={<Categories/>} exact />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App;
