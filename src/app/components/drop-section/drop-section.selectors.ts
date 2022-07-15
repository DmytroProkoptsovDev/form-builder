import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from './drop.section.reducer';

interface AppState {
    dropSection: IState;
}

const selectDropSectionFeature = createFeatureSelector<IState>('dropSection');

export const getElementDetails = createSelector(
    selectDropSectionFeature,
    (state) => state.elementDetails
);

export const getSelectedElement = (id: string) => createSelector(
    getElementDetails,
    (elementDetails) => elementDetails.find(el => el['id'] === id)
)