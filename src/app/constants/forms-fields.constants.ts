import { FORM_NODE, FORM_ELEMENT_NODE } from "../components/drop-section/drop-section.constants"
import { IFormFieldsMetaDataDictionary } from "../models/dictionaries.model"

export const formFieldsMetaDataDictionary: IFormFieldsMetaDataDictionary = {
    [FORM_NODE]: {
        options: {
            'border-style': ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
        },
        suffix: {
            'color': 'RGB',
            'background-color': 'RGB',
            'border-color': 'RBG'
        }
    },
    [FORM_ELEMENT_NODE]: {
        options: {
            'font-weight': ['400', '500', '600', '700', '900'],
            'border-style': ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
        },
        suffix: {
            'width': 'px',
            'height': 'px',
            'font-size': 'px',
            'color': 'RGB',
        }
    },
}