import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});