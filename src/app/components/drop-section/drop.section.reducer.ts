import { createReducer, on } from '@ngrx/store';
import { IElementProperty, addNewField, setSelectedElement } from './drop-section.actions';

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
    on(addNewField, (state, { payload }) => ({
        ...state,
        elementList: [...state.elementList, payload]
    })),
    on(setSelectedElement, ((state, { id }) => ({
        ...state,
        selectedElement: id
    })))
);