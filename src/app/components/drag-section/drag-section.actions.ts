import { createAction, props } from "@ngrx/store";

interface IItemToRemove {
    payload: {
        id: string
    }
}

export const updateDrabableIds = createAction(
    '[Drag section] Update dragable Ids on Drop section drop',
)
export const removeDrabable = createAction(
    '[Drag section] Remove dragable',
    props<IItemToRemove>()
)