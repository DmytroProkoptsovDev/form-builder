import { setAppliedStyles } from './accordion.actions';
import { getDefaultForm, getDefaultFormFields } from './accordion.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IElementFieldProperties } from 'src/app/constants/accordion-data';
import { IElementProperty } from './../drop-section/drop-section.actions';
import { getElementDetails } from './../drop-section/drop-section.selectors';

interface ISelectedStyles {
  [key: string]: {
    [key: string]: string
  }
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  expandedIndex = 0;
  selectedElement: IElementProperty = {};
  isNoElementSelected: boolean = Object.keys(this.selectedElement).length === 0;

  formProperties: IElementFieldProperties[] = [];
  formFieldProperties: IElementFieldProperties[] = [];
  accordionItems = [{ name: 'Form styles' }, { name: 'Field styles' }]
  selectedStyles: ISelectedStyles = {
    'Form styles': {},
    'Field styles': {}
  };

  constructor(private store: Store) {
    this.store.select(getElementDetails).subscribe(data => this.handleElementSelect(data));
    this.store.select(getDefaultForm).subscribe(defaultForm => this.formProperties = defaultForm);
    this.store.select(getDefaultFormFields).subscribe(defaultFormFields => this.formFieldProperties = defaultFormFields)
  }

  ngOnInit(): void {
  }
  handleElementSelect(data: any) {
    const [a] = data;
    this.selectedStyles = {
      ...this.selectedStyles,
      'Field styles': {
          ...a
        }
      }
  }
  getEnteredProps() {
      this.store.dispatch(setAppliedStyles({payload: this.selectedStyles}));
  }
}
