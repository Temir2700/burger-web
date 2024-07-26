import React, {useState} from 'react';
import {ICustomer, IOrderData} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {useAppSelector} from "../../app/hook";
import {selectorCartDishes} from "../../store/cartSlice";

const Order= () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<ICustomer>({
        name: '',
        address: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const cartDishes = useAppSelector(selectorCartDishes);
    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const data: IOrderData = {
            dishes: cartDishes,
            customer,
        };

        try{
            await axiosApi.post('/orders.json', data);
        }  finally {
            setLoading(false);
            navigate('/');
        }
    };

    const customerChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    let form = (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="name">Client name</label>
                <input
                    id="name" type="text"
                    name="name"
                    className="form-control"
                    value={customer.name}
                    onChange={customerChanged}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address" type="text"
                    name="address"
                    className="form-control"
                    value={customer.address}
                    onChange={customerChanged}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone" type="text"
                    name="phone"
                    className="form-control"
                    value={customer.phone}
                    onChange={customerChanged}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Place order
            </button>
        </form>
    );

    if(loading) {
        form = <Spinner/>
    }
    return (
        <div className="row mt-2">
            <div className="col">
                {form}
            </div>
        </div>
    );
};



export default Order;