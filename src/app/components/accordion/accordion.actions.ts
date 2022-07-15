import { createAction, props } from '@ngrx/store';
import { IElementType } from 'src/app/models/actions.model';

export interface IAppliedStyles {
    [key: string]: {[key: string]: string};
}

export const setAppliedStyles = createAction(
    '[Accordion] set styles to apply',
    props<{payload: IAppliedStyles}>()
);