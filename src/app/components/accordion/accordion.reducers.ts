import { createReducer, on } from "@ngrx/store";
import { formProps, formFieldProps, IElementFieldProperties } from '../../constants/accordion-data';
import { setAppliedStyles } from './accordion.actions';

export interface IAccrdionState {
    defaultForm: IElementFieldProperties[];
    defaultFormFields: IElementFieldProperties[];
    stylesToApply: any;
}

const initialState = {
    defaultForm: formProps,
    defaultFormFields: formFieldProps,
    stylesToApply: <any>[]
}


export const accordionReducer = createReducer(
    initialState,
    on(setAppliedStyles, (state, { payload }) => ({
        ...state,
        stylesToApply: [...state.stylesToApply, payload]
    }))
)