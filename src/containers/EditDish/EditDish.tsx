import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import DishForm from "../../components/DishForm/DishForm";
import { IApiDish, IDishMutation, TApiDish } from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  selectFetchOneDishLoading,
  selectOneDish,
  selectUpdateDishLoading,
} from "../../store/dishesSlice";
import { fetchDish, updateDish } from "../../store/dishesThunk";

const EditDish = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const updateLoading = useAppSelector(selectUpdateDishLoading);
  const dish = useAppSelector(selectOneDish);

  const onSubmit = async (dish: TApiDish) => {
    await dispatch(updateDish({ id, dish }));
    navigate("/admin");
  };

  useEffect(() => {
    dispatch(fetchDish(id));
  }, [dispatch, id]);

  return (
    <div>
      {fetchLoading && <Spinner />}
      {dish && (
        <div className="mt-4">
          <DishForm
            onSumbit={onSubmit}
            existingDish={dish}
            isEdit={true}
            isLoading={updateLoading}
          />
        </div>
      )}
    </div>
  );
};

export default EditDish;
