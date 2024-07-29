import React from 'react';
import {IApiDish, TApiDish} from "../../types";
import DishForm from "../../components/DishForm/DishForm";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {createDish} from "../../store/dishesThunk";
import {selectCreateDishLoading} from "../../store/dishesSlice";


const NewDish = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const loading = useAppSelector(selectCreateDishLoading);
    const isAdminRoute = location.pathname.includes('admin');

    const onSubmit = async (dish: TApiDish) => {
        await dispatch(createDish(dish));
        navigate('/admin');
    };

    return (
        <div className="row mt-4">
            <div className="col-12">
                <DishForm onSumbit={onSubmit} isLoading={loading}/>
            </div>
        </div>
    );
};

export default NewDish;