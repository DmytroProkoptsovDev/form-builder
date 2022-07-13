import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './drop-section.actions';


export const initialState = 0;

export const dropSectionReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, () => 0)
);