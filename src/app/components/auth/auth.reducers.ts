import { createReducer, on } from "@ngrx/store";
import { setLoggedInUserName } from "./auth.actions";

export interface IAuthState {
    loggedInUser: string|null
}

const initialState: IAuthState = {
    loggedInUser: null
} 

export const authReducer = createReducer(
    initialState,
    on(setLoggedInUserName, (state, action) => {
        console.log(action);
        return {
            ...state,
            loggedInUser: action?.userName,
        }
    })
)