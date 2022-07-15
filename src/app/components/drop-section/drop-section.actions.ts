import { createAction, props } from '@ngrx/store';
import { IElementProps } from 'src/app/models/actions.model';

export interface IElementProperty {
    [key: string]: string;
}


export const addNewFormField = createAction(
    '[Drop section] add new form field',
    props<{payload: IElementProperty}>()
);

export const selectElement = createAction(
    '[Drop section] Select element',
    props<{payload: IElementProperty}>()
);

export const setSelectedElement = createAction(
    '[Drop section] Set selected element',
    props<{id: string}>()
)