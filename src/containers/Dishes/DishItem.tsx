import React from 'react';
import {IDish} from "../../types";
import {Link, useLocation} from "react-router-dom";
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
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Celebration_Burger_%2849116811283%29.jpg/640px-Celebration_Burger_%2849116811283%29.jpg';
    const image = dish.image || imageUrl;
    const location = useLocation();

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) center / cover no-repeat`,
        width: '100%', // make the image take the full width of its container
        paddingTop: '75%', 
    };

    const addToCart = () => {
        dispatch(addDish(dish));
    };

    const isAdminRoute = location.pathname.includes('admin');

    return (
        <div className="card mb-2 bg-dark w-75 m-auto" style={{opacity: 0.7}}>
            <div className="row no-gutters">
                <div className="col-sm-4 rounded-start" style={{ position: 'relative' }}>
                    <div style={imageStyle} />
                </div>
                <div className="col-sm-8 d-flex flex-column">
                    <div className="card-body">
                        <h5 className="card-title text-white">{dish.name}</h5>
                        <p className="card-text small text-white">{dish.description}</p>
                        <p className="card-text text-white fw-bold">{dish.price} KGS</p>
                    </div>
                    <div className="card-footer mt-auto">
                        <button 
                        onClick={addToCart} 
                        className="btn btn-warning text-white me-2"
                        >
                            Add
                        </button>
                        {
                            isAdminRoute && (
                                <Link
                                    to={'edit-dish/' + dish.id}
                                    className="btn btn-primary">
                                    Edit
                                </Link>
                            )
                        }
                        {
                            isAdminRoute && (
                                <button
                            className="btn btn-danger ms-2"
                            onClick={onDelete}
                            disabled={deleteLoading ? deleteLoading === dish.id : false}
                        >
                            {deleteLoading && deleteLoading === dish.id && (<BtnSpinner/>)}
                            Delete
                                </button>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishItem;