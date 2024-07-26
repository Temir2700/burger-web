import React, {useState} from 'react';
import Modal from "../../components/Modal/Modal";
import {useNavigate} from "react-router-dom";
import CartDishes from "./CartDishes";
import {useAppSelector} from "../../app/hook";

const Cart = () => {
    const cartDishes = useAppSelector((state) => state.cart.cart);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    let cart = (
        <div className="alert alert-primary">
            Cart is empty! Add something!
        </div>
    );

    if(cartDishes.length > 0) {
        cart = (
            <>
                <CartDishes cartDishes={cartDishes}/>
                <button
                    className="w-100 btn btn-primary"
                    onClick={() => setShow(true)}>
                    Order
                </button>
            </>
        );
    }

    return (
        <div className="row mt-42">
            <div className="col-12">
               <h2>Cart</h2>
            {cart}
            <Modal show={show} title={'Order'} onClose={() => setShow(false)}>
                <div className="modal-body">
                    <p>Do you want to continue to checkout?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={() => setShow(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Continue</button>
                </div>
            </Modal> 
            </div>
        </div>
    );
};

export default Cart;