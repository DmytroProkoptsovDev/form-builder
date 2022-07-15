import { createReducer, on } from '@ngrx/store';
import { IElementProperty, selectElement, addNewFormField, setSelectedElement } from './drop-section.actions';

export interface IState {
    elementDetails: IElementProperty[];
    elementList: IElementProperty[];
    selectedElement: string;
}

export const initialState: IState = {
    elementDetails: [],
    elementList: [],
    selectedElement: '',
};

export const dropSectionReducer = createReducer(
    initialState,
    on(addNewFormField, (state, { payload }) => ({
        ...state,
        elementList: [...state.elementList, payload]
    })),
    on(selectElement, (state, { payload }) => ({
        ...state,
        elementDetails: [...state.elementDetails, payload]
    })),
    on(setSelectedElement, ((state, { id }) => ({
        ...state,
        selectedElement: id
    })))
);