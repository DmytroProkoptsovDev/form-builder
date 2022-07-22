import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getAllDroppedFields, getFormStyles, getSelectedElement } from '../drop-section/drop-section.selectors';
import { IAccrdionState } from './accordion.reducers';


const selectAccordionFeature = createFeatureSelector<IAccrdionState>('accordion');

export const getDefaultForm = createSelector(
    selectAccordionFeature,
    (state) => state.defaultForm,
);
export const getDefaultFormFields = createSelector(
    selectAccordionFeature,
    (state) => state.defaultFormFields,
);
export const getAllFiledStyles = createSelector(
    selectAccordionFeature,
    (state) => state.fieldsStyles,
);

export const getFieldStylesToApply = (id: string) => createSelector(
    getAllFiledStyles,
    (allCustomStyles: {[key: string]: string}[]) => {
        return allCustomStyles.find((field: {[key: string]: string }) => field['id'] === id);
    }
);
export const getSelectedFieldStyles = createSelector( 
    getAllFiledStyles,
    getAllDroppedFields,
    getSelectedElement,
    (allCustomStyles: any[], initalFieldStyles: any, selectedElement) => {
        const hasCustom = allCustomStyles.find(
            (field: {[key: string]: string }) =>
                field['id'] === selectedElement);
        
        if (hasCustom) return hasCustom;
        
        return initalFieldStyles.find(
            (field: {[key: string]: string}) =>
                field['id'] === selectedElement);
    }
);

export const getFormStylesToApply = createSelector(
    selectAccordionFeature,
    getFormStyles,
    (state, defaultStyles) => {
        const hasStyles = Object.keys(state.formStyles).length;

        if (hasStyles) return state.formStyles;

        return defaultStyles;
    },
);
export const getAccordionItems = createSelector(
    selectAccordionFeature,
    (state) => state.accordionItems
);
