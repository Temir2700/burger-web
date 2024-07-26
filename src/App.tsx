import React from 'react';
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewDish from "./containers/NewDish/NewDish";
import Checkout from "./containers/Checkout/Checkout";
import Order from "./containers/Order/Order";
import EditDish from "./containers/EditDish/EditDish";

import './App.css';
import Cart from './containers/Cart/Cart';

const App = () => {

  return (
      <>
          <header>
              <Toolbar/>
          </header>
          <main className="container-fluid">
              <Routes>
                  <Route path="/" element={(
                      <Home/>
                  )}/>
                  <Route path="/cart" element={(
                    <Cart />
                  )}/>
                  <Route path="/new-dish" element={(
                      <NewDish/>
                  )}/>

                  <Route path="checkout" element={(
                      <Checkout/>
                  )}>
                      <Route path="continue" element={(
                          <Order/>
                      )}/>
                  </Route>

                  <Route path="/edit-dish/:id" element={(
                      <EditDish/>
                  )}/>
                  <Route path="*" element={(
                  <h1>Not Found!</h1>
                    )}/>
              </Routes>
          </main>
      </>
  );
};

export default App;
