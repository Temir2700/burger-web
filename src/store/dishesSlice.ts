import { IApiDish, IDish, IDishMutation, TApiDish } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDishes,
  deleteDish,
  createDish,
  fetchDish,
  updateDish,
} from "./dishesThunk";
import { RootState } from "../app/store";

interface DishesState {
  items: IDish[];
  oneDish: IDishMutation | null;
  fetchLoading: boolean;
  deleteLoading: boolean | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: DishesState = {
  items: [],
  oneDish: null,
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchDish.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchDish.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.oneDish = action.payload;
    });
    builder.addCase(fetchDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, { meta }) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectCreateDishLoading = (state: RootState) =>
  state.dishes.createLoading;
export const selectUpdateDishLoading = (state: RootState) =>
  state.dishes.updateLoading;
export const selectFetchOneDishLoading = (state: RootState) =>
  state.dishes.fetchOneLoading;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
