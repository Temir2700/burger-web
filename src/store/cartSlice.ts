import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {ICartDish, IDish} from "../types";



interface CartState {
    cart: ICartDish[];
}

const initialState: CartState = {
    cart: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addDish: (state, { payload: dish }: PayloadAction<IDish>)=>{
            const existingIndex = state.cart.findIndex(cartDish => cartDish.dish.id === dish.id);

            if (existingIndex !== -1) {
                state.cart[existingIndex].amount++;
            } else {
                state.cart.push({
                    amount: 1,
                    dish,
                });
            }
        },
        removeDish: (state, { payload: dish }: PayloadAction<IDish>) => {
            const existingIndex = state.cart.findIndex(cartDish => cartDish.dish.id === dish.id);

            if (existingIndex !== -1) {
                state.cart[existingIndex].amount--;

                if (state.cart[existingIndex].amount === 0) {
                    state.cart.splice(existingIndex, 1);
                }
            }
        },
        updateCart: (state, { payload: dishes}: PayloadAction<IDish[]>) => {
            const newCartDishes: ICartDish[] = [];

            state.cart.forEach((cartDish) => {
                const existingDish = dishes.find((dish) => cartDish.dish.id === dish.id);

                if (!existingDish) {
                    return;
                }

                newCartDishes.push({
                    ...cartDish,
                    dish: existingDish,
                });

                state.cart = newCartDishes;
            });
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
});

export const selectorCartDishes = (state: RootState) => state.cart.cart;
export const cartReducer = cartSlice.reducer;
export const {
    addDish,
    updateCart,
    clearCart,
    removeDish
} = cartSlice.actions;