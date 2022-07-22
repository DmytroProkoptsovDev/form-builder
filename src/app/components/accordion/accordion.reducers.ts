import { createReducer, on } from "@ngrx/store";
import { formProps, formFieldProps, IElementFieldProperties } from '../../constants/accordion-data';
import { removeDrabable } from "../drag-section/drag-section.actions";
import { FORM_ELEMENT_NODE, FORM_NODE } from "../drop-section/drop-section.constants";
import {
    IAppliedStyles, setAppliedFieldStyles,
    setAppliedFormStyles, setDefaultFieldStyles,
    setDefaultFormStyles
} from './accordion.actions';

export interface IAccordionItem {
    name: string,
    type: string
}

export interface IAccrdionState {
    defaultForm: IElementFieldProperties[];
    defaultFormFields: IElementFieldProperties[];
    fieldsStyles: any;
    formStyles: any;
    accordionItems: IAccordionItem[];
}

const initialState = {
    defaultForm: formProps,
    defaultFormFields: formFieldProps,
    fieldsStyles: <any>[],
    formStyles: {},
    accordionItems: [
        { name: 'Form styles', type: FORM_NODE},
        { name: 'Field styles', type: FORM_ELEMENT_NODE}
    ]
}

export const accordionReducer = createReducer(
    initialState,
    on(setAppliedFieldStyles, (state, { payload }) => {
        if (!state.fieldsStyles.length) {
            return { ...state, fieldsStyles: [...state.fieldsStyles, payload] }
        }

        const copy = [...state.fieldsStyles];
        
        state.fieldsStyles.forEach((field: IAppliedStyles, index: number) => {
            if (field['id'] !== payload['id']) {
                copy.push(payload);

            } else {
                const isUpdated = JSON.stringify(payload) !== JSON.stringify(field);
                if (isUpdated) copy[index] = payload;
            }
        });
        
        return {
            ...state,
            fieldsStyles: copy
        }
    }),
    on(setAppliedFormStyles, (state, { payload }) => ({
        ...state,
        formStyles: { ...payload }
    })),
    on(setDefaultFieldStyles, (state, { payload }) => ({
        ...state,
        fieldsStyles: state.fieldsStyles.filter(
            (field: {[key: string]: string}) =>
                field['id'] !== payload)
    })),
    on(setDefaultFormStyles, (state) => ({
        ...state,
        formStyles: {}
    })),
    on(removeDrabable, (state, { payload }) => ({
            ...state,
            fieldsStyles: state.fieldsStyles.filter(
                (field: {[key: string]: string}) =>
                    field['id'] !== payload.id)
        }))
)