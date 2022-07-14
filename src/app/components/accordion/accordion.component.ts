import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { formProps, formFieldProps, IElementFieldProperties } from 'src/app/constants/accordion-data';
import { IElementProperty } from './../drop-section/drop-section.actions';
import { getElementDetails } from './../drop-section/drop-section.selectors';

interface IAccordionSection {
  label: string;
  type: string;
  fields: string[];
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  sections: IAccordionSection[] = [
    { label: 'Form styles', type: 'form', fields: ['Text color', 'Background', 'Border type', 'Border color']},
    { label: 'Field styles', type: 'form-element', fields: ['Width', 'Height', 'Font size', 'Font weight', 'Color input', 'Border style']}
  ];
  expandedIndex = 0;
  selectedElement: IElementProperty = {};

  formProperties: IElementFieldProperties[] = formProps;
  formFieldProperties: IElementFieldProperties[] = formFieldProps;
  test: any = {};

  constructor(private store: Store) {
    this.store.select(getElementDetails).subscribe(data => {
      this.selectedElement = data;

      if (Object.keys(data).length) {
        this.formFieldProperties.forEach(el => {
          const { propertyName } = el;
          el.value = data[propertyName];
        })
      }
    });
  }

  ngOnInit(): void {
  }

  getEnteredProps(form: any) {
    console.dir(form[0].value);
    console.log(this.test);
  }
}
