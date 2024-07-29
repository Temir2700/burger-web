import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { IApiDish, IDish, IDishMutation, TApiDish } from "../types";
import { AppDispatch } from "../app/store";
import { updateCart } from "./cartSlice";

export const fetchDishes = createAsyncThunk<
  IDish[],
  undefined,
  { dispatch: AppDispatch }
>("dishes/fetch", async (_, thunkAPI) => {
  const dishesResponse = await axiosApi.get<IApiDish | null>("/dishes.json");
  const dishesData = dishesResponse.data;
  let newDishes: IDish[] = [];

  if (dishesData) {
    newDishes = Object.keys(dishesData).map((key) => {
      return {
        ...dishesData[key],
        id: key,
      };
    });
  }

  thunkAPI.dispatch(updateCart(newDishes));
  return newDishes;
});

export const createDish = createAsyncThunk<void, TApiDish>(
  "dishes/create",
  async (dish) => {
    await axiosApi.post("/dishes.json", dish);
  }
);
export const fetchDish = createAsyncThunk<IDishMutation, string>(
  "dishes/fetchOne",
  async (id) => {
    const response = await axiosApi.get<TApiDish | null>(
      "/dishes/" + id + ".json"
    );
    const dish = response.data;

    if (dish === null) {
      throw new Error("Not found");
    }

    return {
      ...dish,
      price: String(dish.price),
    };
  }
);

interface UpdateDishParams {
  id: string;
  dish: TApiDish;
}

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  "dishes/update",
  async (params) => {
    await axiosApi.put("/dishes/" + params.id + ".json", params.dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  "dishes/delete",
  async (dishId) => {
    await axiosApi.delete("/dishes/" + dishId + ".json");
  }
);
