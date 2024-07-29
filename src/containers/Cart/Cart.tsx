import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import CartDishes from "./CartDishes";
import { useAppSelector } from "../../app/hook";

const Cart = () => {
  const cartDishes = useAppSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  let cart = (
    <div className="alert alert-secondary">Cart is empty! Add something!</div>
  );

  if (cartDishes.length > 0) {
    cart = (
      <div className="mt-4">
        <CartDishes cartDishes={cartDishes} />
        <button
          className="w-100 btn btn-danger m-auto"
          onClick={() => setShow(true)}
        >
          Order
        </button>
      </div>
    );
  }

  return (
    <div className="row mt-42">
      <div className="col-12">
        <h2 className="text-center mb-4 mt-4 text-white text-uppercase">
          Cart
        </h2>
        {cart}
        <Modal show={show} title={"Order"} onClose={() => setShow(false)}>
          <div className="modal-body text-white">
            <p>Do you want to continue to checkout?</p>
          </div>
          <div className="modal-footer mt-4">
            <button className="btn btn-danger" onClick={() => setShow(false)}>
              Cancel
            </button>
            <button
              className="btn btn-warning text-white"
              onClick={() => navigate("/checkout")}
            >
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
