import { createReducer, on } from "@ngrx/store";
import { formProps, formFieldProps, IElementFieldProperties } from '../../constants/accordion-data';
import { FORM_ELEMENT_NODE, FORM_NODE } from "../drop-section/drop-section.constants";
import { setAppliedStyles } from './accordion.actions';

export interface IAccordionItem {
    name: string,
    type: string
}

export interface IAccrdionState {
    defaultForm: IElementFieldProperties[];
    defaultFormFields: IElementFieldProperties[];
    stylesToApply: any;
    accordionItems: IAccordionItem[];
}

const initialState = {
    defaultForm: formProps,
    defaultFormFields: formFieldProps,
    stylesToApply: <any>[],
    accordionItems: [
        { name: 'Form styles', type: FORM_NODE},
        { name: 'Field styles', type: FORM_ELEMENT_NODE}
    ]
}


export const accordionReducer = createReducer(
    initialState,
    on(setAppliedStyles, (state, { payload }) => ({
        ...state,
        stylesToApply: [...state.stylesToApply, payload]
    }))
)