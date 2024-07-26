import React from 'react';
import logo from '../../assets/culvers-logo.png';
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Toolbar = () => {
    const items = useSelector((state: RootState) => state.cart.cart);

    const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <div className='navbar-left'>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            </div>
            
                <div className="collapse navbar-collapse centered-nav" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            <img src={logo} />
                        </NavLink> 
                        </li>
                        <li className="nav-item">
                        <NavLink to="/new-dish" className="nav-link">
                                New dish
                        </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                Cart ({totalAmount})
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;