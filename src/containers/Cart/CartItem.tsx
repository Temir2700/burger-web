import React from 'react';
import {ICartDish, IDish} from "../../types";
import { useAppDispatch } from '../../app/hook';
import { removeDish } from '../../store/cartSlice';
import { useLocation } from 'react-router-dom';

interface Props {
    cartsDish: ICartDish;
}
const CartItem: React.FC<Props> = ({cartsDish}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const price = cartsDish.dish.price * cartsDish.amount;

    const deleteFromCart = (dish: IDish) => {
        dispatch(removeDish(dish));
    };

    const isCartPage = location.pathname.includes('cart');

    return (
        <div className="card mb-2 p-2">
            <div className="row align-items-center">
                <div className="col">{cartsDish.dish.name}</div>
                <div className="col-2">x {cartsDish.amount}</div>
                <div className="col-3 text-right">
                    {price} KGS
                </div>
                {isCartPage && (
                    <div className='col-1'>
                        <button 
                            onClick={() => deleteFromCart(cartsDish.dish)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default CartItem;