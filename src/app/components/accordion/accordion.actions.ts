import { createAction, props } from '@ngrx/store';
import { IElementType } from 'src/app/models/actions.model';

export interface IAppliedStyles {
    [key: string]: string;
}

export const setAppliedFieldStyles = createAction(
    '[Accordion] Set field styles to apply',
    props<{payload: IAppliedStyles}>()
);
export const setDefaultFieldStyles = createAction(
    '[Accordion] Set default field styles',
    props<{payload: string}>()
);
export const setAppliedFormStyles = createAction(
    '[Accordion] Set form styles to apply',
    props<{payload: IAppliedStyles}>()
);
export const setDefaultFormStyles = createAction(
    '[Accordion] Set default field styles',
);