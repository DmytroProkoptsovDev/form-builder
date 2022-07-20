//libs
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

//NgRx instances
import { Store } from '@ngrx/store';
import { addNewField, IElementProperty, initFormStyles, setSelectedElement } from './drop-section.actions';
import { updateDrabableIds } from '../drag-section/drag-section.actions';

// intrfaces and types
import { IAppliedStyles } from '../accordion/accordion.actions';
import { IDragable } from 'src/app/models/drabable.model';
import { FORM_NODE, FORM_ELEMENT_NODE } from './drop-section.constants';
import { getFormStylesToApply } from '../accordion/accordion.selectors';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';

const props = [
  'width',
  'height',
  'font-size',
  'font-weight',
  'color',
  'border-style',
];

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.scss']
})
export class DropSectionComponent implements OnInit, AfterViewInit {

  @ViewChild('form') formRef!: ElementRef;

  public formDropContainer: IDragable[] = [];
  public userCustomStyles: IAppliedStyles = {};

  public formNode: string = FORM_NODE;
  public formElementNode: string = FORM_ELEMENT_NODE;

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
    ) {}
  ngOnInit(): void {
    this.store.select(getFormStylesToApply).subscribe(formStyles => {
      this.propertyService
      .setProps(formStyles)
      .setRef(this.formRef)
      .applyAllProperties();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.formRef;

      this.defineElement(nativeElement, nativeElement.name);
    })
  }
  
  defineElement = (element: any, name: string) => {
    const computedCSS = window.getComputedStyle(element, ':placeholder');
    const nonCSSProps = {
      textContent: element?.textContent ? element.textContent.trim() : '',
      placeholder: element?.placeholder?.trim() ?? '',
      id: element?.id,
      name,
    }
    const cssProps = props.reduce((obj: any, prop: string) => {
      const cssPropValue = computedCSS.getPropertyValue(prop);
      const sanitized = this.removeSuffix(cssPropValue);

      obj[prop] = sanitized;

      return obj;
    }, {});
    
    const elementDetails = {
      ...cssProps,
      ...nonCSSProps
    };

    name === this.formNode
      ? this.store.dispatch(initFormStyles({ payload: elementDetails }))
      : this.store.dispatch(addNewField({ payload: elementDetails }));
  }
  drop(event: CdkDragDrop<IDragable[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } 
    this.store.dispatch(updateDrabableIds());
  }
  removeSuffix(str: string): string {
    const cleared = parseInt(str, 10);

    return Number.isNaN(cleared) ? str : cleared.toFixed(0);
  }
  selectElement = (id: string) => {
    this.store.dispatch(setSelectedElement({ id }))
  }
}
