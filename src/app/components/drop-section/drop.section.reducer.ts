import { createReducer, on } from '@ngrx/store';
import {
    IElementProperty, addNewField,
    setSelectedElement, initFormStyles
} from './drop-section.actions';

export interface IState {
    elementList: IElementProperty[];
    defaultFormStyles: IElementProperty;
    selectedElement: string;
}

export const initialState: IState = {
    elementList: [],
    defaultFormStyles: {},
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
    }))),
    on(initFormStyles, (state, { payload }) => ({
        ...state,
        defaultFormStyles: { ...payload }
    }))
);