import { createReducer, on } from '@ngrx/store';
import { IElementProperty, selectElement } from './drop-section.actions';

export interface IState {
    elementDetails: IElementProperty;
}

export const initialState: IState = {
    elementDetails: {},
};

export const dropSectionReducer = createReducer(
    initialState,
    on(selectElement, (state, { payload }) => ({ elementDetails: payload })),
);