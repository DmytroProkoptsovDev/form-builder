import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IGeneralStylesControls, IFieldStylesControls, IField } from '../../models/form.model';


const generalStylesFlag = 'general-styles';
const fieldStylesFlag = 'field-styles';

type TFlag = typeof generalStylesFlag | typeof fieldStylesFlag

@Injectable({
  providedIn: 'root'
})
export class StylesPickerService {
  public generalStylesFormFileds = [
    { fieldName: 'label', propertyName: 'text-content', type: 'input' },
    { fieldName: 'color', propertyName: 'color', type: 'input' },
    { fieldName: 'background color', propertyName: 'background-color', type: 'input' },
    { fieldName: 'border type', propertyName: 'border-style', type: 'select' },
    { fieldName: 'border color', propertyName: 'border-color', type: 'input' },
  ];
  public fieldStylesFormFields = [
    { fieldName: 'label', propertyName: 'text-content', type: 'input' },
    { fieldName: 'width', propertyName: 'width', type: 'input' },
    { fieldName: 'height', propertyName: 'height', type: 'input' },
    { fieldName: 'font size', propertyName: 'font-size', type: 'input' },
    { fieldName: 'font weight', propertyName: 'font-weight', type: 'select' },
    { fieldName: 'color', propertyName: 'color', type: 'input' },
    { fieldName: 'border type', propertyName: 'border-style', type: 'select' },
    { fieldName: 'required', propertyName: 'required', type: 'checkbox' },
  ]

  constructor() {}

  getFormGroup(flag: TFlag) {
    let source!: IField[];

    switch(flag) {
      case generalStylesFlag:
        source = this.generalStylesFormFileds;
        break;
      case fieldStylesFlag:
        source = this.fieldStylesFormFields;
        break;
      default:
        throw new Error('Unknown flag');
    }

    const controls = source.reduce((acc: any, field: IField) => {
      acc[field.propertyName] = new FormControl('');

      return acc;
    }, {})

    return new FormGroup(controls);
  }
}
