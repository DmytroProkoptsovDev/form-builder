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
export const getStylesToApply = createSelector(
    selectAccordionFeature,
    (state) => state.stylesToApply,
);
export const getAccordionItems = createSelector(
    selectAccordionFeature,
    (state) => state.accordionItems
)