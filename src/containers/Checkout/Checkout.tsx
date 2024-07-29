import React from 'react';
import CartDishes from "../Cart/CartDishes";
import {Link, Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hook";
import {selectorCartDishes} from "../../store/cartSlice";

const Checkout= () => {
    const cartDishes = useAppSelector(selectorCartDishes);
    if(cartDishes.length === 0) {
        return <Navigate to={"/"}/>
    }

    return (
        <div className="row mt-2">
            <div className="col-4 mx-auto">
                <h4 className='text-white text-center mb-4 mt-4 text-uppercase'>Checkout</h4>
                <CartDishes cartDishes={cartDishes}/>
                <div className="d-flex gap-2 align-center justify-content-center">
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                    <Link to="continue" className="btn btn-warning text-white">Continue</Link>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Checkout;