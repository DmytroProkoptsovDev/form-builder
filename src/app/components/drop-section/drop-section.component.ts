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
  @ViewChild('heading') headingRef!: ElementRef;

  public formDropContainer: IDragable[] = [];
  public isSelected!: boolean;
  
  public formNode: string = FORM_NODE;
  public formElementNode: string = FORM_ELEMENT_NODE;
  
  public formStyles!: any;


  constructor(
    private store: Store,
    private propertyService: PropertySetterService
    ) {}
  ngOnInit(): void {
    this.store.select(getFormStylesToApply).subscribe(formStyles => {
      this.formStyles = formStyles
      // this.propertyService
      //   .setProps(formStyles)
      //   .setRef(this.headingRef)
      //   .applyNonCSSProperties()
      //   .setRef(this.formRef)
      //   .applyCSSProperties();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement: form } = this.formRef;

      this.defineElement(form, form.name);
    })
  }
  
  defineElement = (element: any, name: string) => {
    const isButton = name === 'button';
    const [ label, field ] = element.children;

    const textContent = isButton
      ? element?.textContent?.trim() ?? ''
      : label?.textContent?.trim() ?? '';

    const placeholder = field?.placeholder?.trim() ?? '';
    const id = element?.id;
    
    const computedCSS = window.getComputedStyle(element);
    const nonCSSProps = {
      textContent,
      placeholder,
      id,
      name,
    }
    const cssProps = props.reduce((obj: any, prop: string) => {
      const cssPropValue = computedCSS.getPropertyValue(prop);
      let sanitized: string | undefined = this.removeSuffix(cssPropValue);
      const isRgb = sanitized.includes('rgb');

      if(isRgb) {
        sanitized = this.rgbToHex(sanitized);
      }

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
    console.log(this.formDropContainer);
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
  rgbToHex(rgb: string) {
    const rgbArr = rgb.match(/\d+/g);
    const toHex = (color: string) => {
      const hexadecimal = parseInt(color, 10).toString(16);
      return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    }

    return rgbArr?.reduce((hex, color) => hex += toHex(color), '#');
  }
  selectElement = (id: string) => {
    this.store.dispatch(setSelectedElement({ id }))
  }
}
