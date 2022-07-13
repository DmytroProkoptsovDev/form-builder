import { createAction, props } from '@ngrx/store';
import { IElementType } from 'src/app/models/actions.model';

export const setElementType = createAction(
    '[Accordion] Set element type',
    props<IElementType>()
);