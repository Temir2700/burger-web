import React from 'react';
import CartItem from "./CartItem";
import {ICartDish} from "../../types";

interface IProps{
    cartDishes: ICartDish[];
}

const CartDishes: React.FC<IProps> = ({cartDishes}) => {
    const sum = cartDishes.reduce((acc, value) => {
        return acc + value.amount * value.dish.price;
    }, 0);

    return (
        <div>
            {cartDishes.map(oneCartDish => {
                return <CartItem key={oneCartDish.dish.id} cartsDish={oneCartDish}/>;
            })}

            <div className="card border-0 p-2">
                <div className="row">
                    <div className="col text-right">
                        Total:
                    </div>
                    <div className="col-3 text-end">
                        <strong>{sum}</strong> KGS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDishes;