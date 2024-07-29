import React, { useState } from "react";
import { ICustomer, IOrderData } from "../../types";
import axiosApi from "../../axiosApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { clearCart, selectorCartDishes } from "../../store/cartSlice";

const Order = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<ICustomer>({
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectorCartDishes);
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const data: IOrderData = {
      dishes: cartDishes,
      customer,
    };

    try {
      await axiosApi.post("/orders.json", data);
      dispatch(clearCart());
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const customerChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="mb-2 text-white">
          Client name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="form-control bg-dark border-0 mb-2"
          value={customer.name}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="mb-2 text-white">
          Address
        </label>
        <input
          id="address"
          type="text"
          name="address"
          className="form-control bg-dark border-0 mb-2"
          value={customer.address}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="mb-2 text-white">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          className="form-control bg-dark border-0 mb-4"
          value={customer.phone}
          onChange={customerChanged}
        />
      </div>
      <div className="d-flex align-center justify-content-center">
        <button type="submit" className="btn btn-danger">
          Place order
        </button>
      </div>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className="row mt-2">
      <div className="col">{form}</div>
    </div>
  );
};

export default Order;
