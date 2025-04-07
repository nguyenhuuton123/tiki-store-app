import React from "react";
import {useLocation} from "react-router-dom";
import CheckoutForm from "./checkout_form";
import Breadcrumbs from "../../components/page_props/breadcrumbs";

const Checkout = ({cartData}) => {
    const location = useLocation();
    const {state} = location;
    if (!state || !state.cartItems) {
        return <div>No cart data available</div>;
    }

    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Checkout"/>
            <CheckoutForm cart={state}/>
        </div>
    );
};

export default Checkout;
