import React, { useEffect, useState } from "react";
import './PaymentSuccess.css';
import { useSearchParams } from "react-router-dom";


function PaymentSuccess(){
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    return(
        <div>
            <h1>Order successful</h1>
            <h1>Reference No: {referenceNum}</h1>
        </div>
    )
}

export default PaymentSuccess;