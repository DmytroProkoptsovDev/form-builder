import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from './drop.section.reducer';

interface AppState {
    dropSection: IState;
}

const selectDropSectionFeature = createFeatureSelector<IState>('dropSection');

export const getAllDroppedFields = createSelector(
    selectDropSectionFeature,
    (state) => state.elementList
);

export const getSelectedElement = createSelector(
    selectDropSectionFeature,
    (state) => state.selectedElement
)
export const getSelectedFieldProps = createSelector(
    getAllDroppedFields,
    getSelectedElement,
    (elementList, selectedElement) => elementList.find(el => el['id'] === selectedElement)
)
export const getFormStyles = createSelector(
    selectDropSectionFeature,
    (state) => state.formStyles,
)