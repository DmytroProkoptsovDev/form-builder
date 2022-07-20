import { createSelector, createFeatureSelector } from '@ngrx/store';
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

export const getFormStylesToApply = createSelector(
    selectAccordionFeature,
    (state) => state.formStyles,
)
export const getAccordionItems = createSelector(
    selectAccordionFeature,
    (state) => state.accordionItems
);