import { createAction, props } from '@ngrx/store';
import { IElementProps } from 'src/app/models/actions.model';

export interface IElementProperty {
    [key: string]: string;
}


export const applyPropsToElement = createAction(
    '[Drop section] Apply props to element',
    props<IElementProps>()
);

export const selectElement = createAction(
    '[Drop section] Select elemet',
    props<{payload: IElementProperty}>()
);