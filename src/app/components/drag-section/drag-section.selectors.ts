import { createFeatureSelector, createSelector} from "@ngrx/store";
import { IDragSectionState } from "./drag-section.reducers";

export const selectDragSectionFeature = createFeatureSelector<IDragSectionState>('dragSection');

export const getAllDragables = createSelector(
    selectDragSectionFeature,
    (state) => state.dragables
)