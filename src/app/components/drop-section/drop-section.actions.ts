import { createAction, props } from '@ngrx/store';
import { IElementProps } from 'src/app/models/actions.model';

export const applyPropsToElement = createAction(
    '[Drop section] Apply props to element',
    props<IElementProps>()
);
