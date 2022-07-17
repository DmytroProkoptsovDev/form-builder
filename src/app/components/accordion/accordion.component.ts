// libs
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

// NgRx instances
import { setAppliedStyles } from './accordion.actions';
import { getAccordionItems, getDefaultForm, getDefaultFormFields } from './accordion.selectors';
import { getSelectedFieldProps } from './../drop-section/drop-section.selectors';

// interfaces and types
import { IElementFieldProperties } from 'src/app/constants/accordion-data';
import { IElementProperty } from './../drop-section/drop-section.actions';
import { IAccordionItem } from './accordion.reducers';
import { FORM_NODE, FORM_ELEMENT_NODE } from '../drop-section/drop-section.constants';

type TElementProps = IElementProperty | undefined;
interface ISlectedStyles {
  [key: string]: {
    [key: string]: IElementProperty
  }
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  public expanded: string = '';
  public formProperties!: any[];
  public formFieldProperties!: any[];
  public accordionItems!: IAccordionItem[];
  public selectedStyles: ISlectedStyles = {};
  fs: any = {}
  fe: any = {}

  public formNode: string = FORM_NODE;
  public formElementNode: string = FORM_ELEMENT_NODE;

  constructor(private store: Store) {
    this.store.select(getAccordionItems).subscribe(items => this.accordionItems = items);
    this.store.select(getDefaultForm).subscribe(defaultForm => this.formProperties = defaultForm);
    this.store.select(getDefaultFormFields).subscribe(defaultFormFields => this.formFieldProperties = defaultFormFields);
    // this.store.select(getSelectedFieldProps).subscribe(fieldProps => this.fieldStyles = fieldProps);
  }
  ngOnInit(): void {
  }

  applyEnteredStyles(id: string) {
    console.log(this.selectedStyles[id]);

      // this.store.dispatch(setAppliedStyles({payload: this.selectedStyles$}));
  }
  onInputChange(event: any) {
    console.log(event);
    //   this.selectedStyles = {
    //   ...this.selectedStyles,
    //   [this.expanded]: {
    //     ...this.selectedStyles[this.expanded],
    //     [event.target.name]: event.target.value
    //   }
    // }
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
}