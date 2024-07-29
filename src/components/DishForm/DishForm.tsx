import React, { useState } from "react";
import { IDishMutation, TApiDish } from "../../types";
import BtnSpinner from "../Spinner/BtnSpinner";

interface Props {
  onSumbit: (newDish: TApiDish) => void;
  existingDish?: IDishMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialState = {
  name: "",
  description: "",
  image: "",
  price: "",
};
const DishForm: React.FC<Props> = ({
  onSumbit,
  existingDish = initialState,
  isEdit,
  isLoading,
}) => {
  const [newDish, setDish] = useState<IDishMutation>(existingDish);

  const dishChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setDish((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSumbit({
      ...newDish,
      price: parseFloat(newDish.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="text-center text-white text-uppercase">
        {isEdit ? "Edit burger" : "Add new burger"}
      </h4>
      <div className="form-group mb-2">
        <label className="mb-2 text-white" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control bg-dark border-0 text-white"
          value={newDish.name}
          onChange={dishChange}
        />
      </div>

      <div className="form-group mb-2">
        <label className="mb-2 text-white" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control bg-dark border-0 text-white"
          value={newDish.description}
          onChange={dishChange}
        />
      </div>

      <div className="form-group mb-2">
        <label className="mb-2 text-white" htmlFor="image">
          Image link
        </label>
        <input
          type="url"
          name="image"
          id="image"
          className="form-control bg-dark border-0 text-white"
          value={newDish.image}
          onChange={dishChange}
        />
      </div>

      <div className="form-group mb-4 text-white">
        <label className="mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control bg-dark border-0 text-white"
          value={newDish.price}
          onChange={dishChange}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading && <BtnSpinner />}
        {isEdit ? "Save" : "Create"}
      </button>
    </form>
  );
};

export default DishForm;
