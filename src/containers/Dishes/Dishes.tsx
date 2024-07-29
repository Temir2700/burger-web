import React, {useEffect} from 'react';
import DishItem from "./DishItem";
import {IDish} from "../../types";
import {useSelector} from "react-redux";
import {fetchDishes, deleteDish} from "../../store/dishesThunk";
import {RootState} from "../../app/store";
import {useAppDispatch} from "../../app/hook";
import Spinner from "../../components/Spinner/Spinner";

const Dishes = () => {
    const dispatch = useAppDispatch();
    const items = useSelector((state: RootState) => state.dishes.items);
    const dishesLoading = useSelector((state: RootState) => state.dishes.fetchLoading);
    const deleteLoading = useSelector((state: RootState) => state.dishes.deleteLoading);

    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    let dishes: React.ReactNode = <div className="text-center"><Spinner/></div>;

    if(!dishesLoading) {
        dishes = items.map((item: IDish) => (
            <DishItem
                key={item.id}
                dish={item}
                onDelete={() => removeDish(item.id)}
                deleteLoading={deleteLoading}
            />
        ));
    }

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
            <h3 className="text-center text-white mb-4 text-uppercase">Menu</h3>
            {dishes}
        </>
    );
};

export default Dishes;