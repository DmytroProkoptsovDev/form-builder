import { createAction, props } from '@ngrx/store';

export interface IElementProperty {
    [key: string]: string;
}

export const addNewField = createAction(
    '[Drop section] Add new field',
    props<{payload: IElementProperty}>()
);
export const initFormStyles = createAction(
    '[Drop section] Init form styles',
    props<{payload: IElementProperty}>()
)

export const setSelectedElement = createAction(
    '[Drop section] Set selected element',
    props<{id: string}>()
)