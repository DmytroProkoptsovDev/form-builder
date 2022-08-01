import { createAction, props } from "@ngrx/store";

export const setLoggedInUserName = createAction(
    '[Auth] Set logged in user name',
    props<{userName: string}>()
);