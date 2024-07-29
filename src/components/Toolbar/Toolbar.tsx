import React from "react";
import logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Toolbar = () => {
  const location = useLocation();
  const items = useSelector((state: RootState) => state.cart.cart);

  const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);

  const isAdminRoute = location.pathname.includes("admin");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-left">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse centered-nav" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {isAdminRoute ? (
                <NavLink to="/admin" className="nav-link">
                  <img src={logo} />
                </NavLink>
              ) : (
                <NavLink to="/" className="nav-link">
                  <img src={logo} />
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {isAdminRoute && (
                <NavLink to="/admin/new-dish" className="nav-link">
                  New burger
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {isAdminRoute ? (
                <NavLink to="/admin/orders" className="nav-link">
                  All orders
                </NavLink>
              ) : (
                <NavLink to="/cart" className="nav-link">
                  Cart ({totalAmount})
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
