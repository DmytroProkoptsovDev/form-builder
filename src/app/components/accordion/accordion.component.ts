// libs
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

// NgRx instances
import { setAppliedFieldStyles, setAppliedFormStyles, setDefaultFieldStyles, setDefaultFormStyles } from './accordion.actions';

// interfaces and types
import { IElementProperty } from './../drop-section/drop-section.actions';
import { FORM_NODE, FORM_ELEMENT_NODE } from '../drop-section/drop-section.constants';
import { StylesPickerService } from 'src/app/services/styles-picker/styles-picker.service';
import { IField } from 'src/app/models/form.model';
import { IDefault, IFormFieldsMetaDataDictionary } from 'src/app/models/dictionaries.model';
import { formFieldsMetaDataDictionary } from 'src/app/constants/forms-fields.constants';
import { getFormStylesToApply, getSelectedFieldStyles } from './accordion.selectors';


interface IDictionary {
  [key: string]: {
    formGroup: FormGroup;
    formFields: IField[];
  }
}
interface IAccordionElemenets {
  nameStatic: string;
  nameExpanded: string | null;
  node: string;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {

  public shouldDisableButtons!: boolean;
  public formNode: string = FORM_NODE;
  public fieldNode: string = FORM_ELEMENT_NODE;
  public selectedFieldId!: string;
  public selectedFieldName!: string;

  public accordionElems: IAccordionElemenets[] =  [
    {
      nameStatic: 'Form styles',
      nameExpanded: 'General form styles',
      node: this.formNode,
    },
    {
      nameStatic: 'Field styles',
      nameExpanded: null,
      node: this.fieldNode,
    },
  ];

  public dictionary!: IDictionary;
  public fieldsMetaData: IFormFieldsMetaDataDictionary = formFieldsMetaDataDictionary;
  
  public generalStylesFormFields!: IField[];
  public fieldStylesFormFields!: IField[];

  public default: IDefault = {};

  constructor(
      private store: Store,
      private stylePicker: StylesPickerService
    ) {
    this.store.select(getSelectedFieldStyles).subscribe(this.handleSelectedFieldStyles);
    this.store.select(getFormStylesToApply).subscribe(this.handleFormStyles);

    this.dictionary = {
      [this.formNode]: {
        formGroup: this.stylePicker.getFormGroup('general-styles'),
        formFields: this.stylePicker.generalStylesFormFileds,
      },
      [this.fieldNode]: {
        formGroup: this.stylePicker.getFormGroup('field-styles'),
        formFields: this.stylePicker.fieldStylesFormFields,
      }
    }
  }
  ngOnInit(): void {}
  handleSelectedFieldStyles = (selectedFieldProps: IElementProperty|undefined) => {
    this.shouldDisableButtons = !Boolean(selectedFieldProps);

    const data = selectedFieldProps ?? {};
    const field = Object.keys(data).reduce((acc: any, prop: string) => {
      const isBoolean = typeof data[prop] === 'boolean';
  
      acc[prop] = isBoolean ? data[prop] : data[prop]?.replace(/px/g, '');

      return acc;
    },{});
    const fieldForm = this.dictionary?.[this.fieldNode]?.formGroup;

    this.selectedFieldId = field?.['id'];
    this.selectedFieldName = field?.['name'];
    this.default[this.fieldNode] = field;

    fieldForm?.patchValue(field);
  }
  handleFormStyles = (formStyles: IElementProperty) => {
    const formStylesForm = this.dictionary?.[this.formNode]?.formGroup;

    formStylesForm?.patchValue(formStyles);
  }
  onSubmit(id: string) {
    const { value } = this.dictionary[id].formGroup;
    const suffixed = this.addSuffix(id, value);
    const withId = { ...suffixed, id: this.selectedFieldId };
    
    const action = id === this.fieldNode
      ? setAppliedFieldStyles({ payload: withId })
      : setAppliedFormStyles({ payload: value});

    this.store.dispatch(action);
  }
  reset(formName: string) {
    const action = formName === this.formNode
      ? setDefaultFormStyles()
      : setDefaultFieldStyles({ payload: this.selectedFieldId });

    this.store.dispatch(action);
  }
  addSuffix(formName: string, value: any) {
    const fields = this.dictionary?.[formName]?.formFields;
    const suffixed = fields.reduce((acc: {[key: string]: string}, { suffix, propertyName }: IField) => {
      const propertyValue = value[propertyName];
      if (suffix === 'px') {
        acc[propertyName] = propertyValue + suffix;

        return acc;
      }

      acc[propertyName] = propertyValue;
      return acc;
    }, {})

    return suffixed;
}
}