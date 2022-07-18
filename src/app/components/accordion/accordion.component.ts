// libs
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

// NgRx instances
import { setAppliedStyles } from './accordion.actions';
import { getAccordionItems, getDefaultForm, getDefaultFormFields } from './accordion.selectors';
import { getSelectedFieldProps } from './../drop-section/drop-section.selectors';

// interfaces and types
import { IElementFieldProperties } from 'src/app/constants/accordion-data';
import { IElementProperty } from './../drop-section/drop-section.actions';
import { IAccordionItem } from './accordion.reducers';
import { FORM_NODE, FORM_ELEMENT_NODE } from '../drop-section/drop-section.constants';
import { StylesPickerService } from 'src/app/services/styles-picker/styles-picker.service';
import { IField } from 'src/app/models/form.model';
import { IFormFieldsMetaDataDictionary } from 'src/app/models/dictionaries.model';
import { formFieldsMetaDataDictionary } from 'src/app/constants/forms-fields.constants';

interface ISlectedStyles {
  [key: string]: {
    [key: string]: IElementProperty
  }
}
interface IDictionary {
  [key: string]: {
    formGroup: FormGroup;
    formFields: IField[];
  }
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {

  public expanded: string = '';
  public formProperties!: any[];
  public formFieldProperties!: any[];
  public accordionItems!: IAccordionItem[];
  public selectedStyles: ISlectedStyles = {};

  public formNode: string = FORM_NODE;
  public fieldNode: string = FORM_ELEMENT_NODE;

  public generalStylesForm!: FormGroup;
  public fieldStylesForm!: FormGroup;
  public accordionElems!: any;

  public dictionary!: IDictionary;
  public fieldsMetaData!: IFormFieldsMetaDataDictionary;
  public generalStylesFormFields!: IField[];
  public fieldStylesFormFields!: IField[];

  constructor(
    private store: Store,
    private stylePicker: StylesPickerService
    ) {
    this.store.select(getAccordionItems).subscribe(items => this.accordionItems = items);
    this.store.select(getDefaultForm).subscribe(defaultForm => this.formProperties = defaultForm);
    this.store.select(getDefaultFormFields).subscribe(defaultFormFields => this.formFieldProperties = defaultFormFields);
    this.store.select(getSelectedFieldProps).subscribe(selectedFieldProps => {
      const data = selectedFieldProps ?? {};
      console.log(data);
      console.log(this.generalStylesForm?.patchValue(data));
      console.log(this.generalStylesForm)
    });

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
    this.fieldsMetaData = formFieldsMetaDataDictionary;
    // this.generalStylesForm = this.stylePicker.getFormGroup('general-styles');
    // this.fieldStylesForm = this.stylePicker.getFormGroup('field-styles');
    // this.generalStylesFormFields = this.stylePicker.generalStylesFormFileds;
    // this.fieldStylesFormFields = this.stylePicker.fieldStylesFormFields;
    this.accordionElems = [
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
    ]
  }
  ngOnInit(): void {
  }

  applyEnteredStyles(id: string) {
    console.log(this.selectedStyles[id]);

      // this.store.dispatch(setAppliedStyles({payload: this.selectedStyles$}));
  }
  onInputChange(event: any) {
    console.log(event);
      this.selectedStyles = {
      ...this.selectedStyles,
      [this.expanded]: {
        ...this.selectedStyles[this.expanded],
        [event.target.name]: event.target.value
      }
    }
  }
  // onInputChange(event: any) {

  // if(this.expanded === this.formNode) {
  //   this.fs = {
  //     ...this.fs,
  //     [event.target.name]: event.target.value
  //     }
  //   }

  // if(this.expanded === this.formElementNode) {
  //   this.fe = {
  //     ...this.fe,
  //     [event.target.name]: event.target.value
  //     }
  //   }
  // }

  setExpandedItem(itemId: string) {
    this.expanded = itemId;
  }
  a(event: any) {
    console.log(event)
  }
  onSubmit(id: string) {
    console.log(this.dictionary[id].formGroup); 
  }
}