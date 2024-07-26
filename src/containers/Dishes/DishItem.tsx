import React from 'react';
import {IDish} from "../../types";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {addDish} from "../../store/cartSlice";
import BtnSpinner from "../../components/Spinner/BtnSpinner";

interface Props {
    dish: IDish;
    onDelete: React.MouseEventHandler;
    deleteLoading: boolean | string;
}

const DishItem: React.FC<Props> = ({dish, onDelete, deleteLoading}) => {
    const dispatch = useAppDispatch();
    const imageUrl = 'https://curlytales.com/wp-content/uploads/2023/04/Goofy-Cow-Burger.jpg';
    const image = dish.image || imageUrl;

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) center / cover no-repeat`,
    };

    const addToCart = () => {
        dispatch(addDish(dish));
    };

    return (
        <div className="card mb-2" >
            <div className="row no-gutters">
                <div className="col-sm-4 rounded-start" style={imageStyle}/>
                <div className="col-sm-8">
                    <div className="card-body">
                        <h5 className="card-title">{dish.name}</h5>
                        <p className="card-text small">{dish.description}</p>
                        <p className="card-text">{dish.price}</p>
                    </div>
                    <div className="card-footer">
                        <button onClick={addToCart} className="btn btn-success me-2">Add</button>
                        <Link
                            to={'edit-dish/' + dish.id}
                            className="btn btn-primary">
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger ms-2"
                            onClick={onDelete}
                            disabled={deleteLoading ? deleteLoading === dish.id : false}
                        >
                            {deleteLoading && deleteLoading === dish.id && (<BtnSpinner/>)}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishItem;