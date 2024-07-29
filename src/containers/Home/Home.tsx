import React from "react";
import Dishes from "../Dishes/Dishes";
import Cart from "../Cart/Cart";

const Home = () => {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <Dishes />
      </div>
    </div>
  );
};

export default Home;
