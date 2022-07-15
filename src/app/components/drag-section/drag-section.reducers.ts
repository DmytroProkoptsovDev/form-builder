import { createReducer, on } from "@ngrx/store";
import { nanoid } from 'nanoid';

import { removeDrabable, updateDrabableIds } from './drag-section.actions';
import { IDragable } from 'src/app/models/drabable.model';

export interface IDragSectionState {
    dragables: IDragable[];
}

export const initialState: IDragSectionState = {
    dragables: [
        { type: 'input', id: nanoid() },
        { type: 'button', id: nanoid() },
        { type: 'textarea', id: nanoid() },
        { type: 'checkbox', id: nanoid() },
        { type: 'select', id: nanoid() },
    ]
}

export const dragSectionReducer = createReducer(
    initialState,
    on(updateDrabableIds, (state) => ({
        ...state,
        dragables: state.dragables.map(el => ({ ...el, id: nanoid() }))
    })),
    on(removeDrabable, ((state, { payload }) => ({
        ...state,
        dragables: state.dragables.filter(el => el.id !== payload.id)
    })))
)