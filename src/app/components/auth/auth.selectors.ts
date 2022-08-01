import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "./auth.reducers";

export const selectAuthFeature = createFeatureSelector<IAuthState>('auth');

export const getLoggedInUser = createSelector(
    selectAuthFeature,
    (state) => state.loggedInUser,
)