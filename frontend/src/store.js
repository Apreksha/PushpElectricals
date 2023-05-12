import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Reducers/productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { newOrderReducer } from "./Reducers/orderReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    forgotPassword: forgotPasswordReducer,
    newOrder: newOrderReducer
});

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;