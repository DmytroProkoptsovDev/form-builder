import { FORM_NODE, FORM_ELEMENT_NODE } from './../components/drop-section/drop-section.constants';

type TSelectOptions = string[];

interface IFormFieldMeta {
    options: {
        [key: string]: TSelectOptions;
    },
    suffix: {
        [key: string]: string;
    }
}

export interface IFormFieldsMetaDataDictionary {
    [key: string]: IFormFieldMeta
}

export interface IDefault {
    [key: string]: {
        [key: string]: string,
    }
}