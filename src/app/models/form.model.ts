import { FormControl } from '@angular/forms';

export interface IGeneralStylesControls {
    [key: string]: FormControl<string | number | boolean>;
}

export interface IFieldStylesControls {
    [key: string]: FormControl<string | number | boolean>;
}

export interface IField {
    propertyName: string;
    fieldName: string;
    type: string;
}