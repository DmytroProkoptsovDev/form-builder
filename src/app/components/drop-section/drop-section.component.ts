//libs
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

//NgRx instances
import { Store } from '@ngrx/store';
import { addNewField, initFormStyles, setSelectedElement } from './drop-section.actions';
import { updateDrabableIds } from '../drag-section/drag-section.actions';

// intrfaces and types
import { IDragable } from 'src/app/models/drabable.model';
import { FORM_NODE, FORM_ELEMENT_NODE } from './drop-section.constants';
import { getFormStylesToApply } from '../accordion/accordion.selectors';

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

  constructor(private store: Store) {}
  
  ngOnInit(): void {
    this.store.select(getFormStylesToApply).subscribe(formStyles => {
      this.formStyles = formStyles;
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
      const sanitized: string | undefined = this.removeSuffix(cssPropValue);

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
    const regexpRGB = /rgb/;
    const regexpDigits = /\d+/g;

    const isRGB = regexpRGB.test(str);

    if (isRGB) {
      const [red, green, blue] = str.match(regexpDigits) ?? [];
      const converted = this.RGBToHex(red, green, blue);

      return converted;
    }
    const cleared = parseInt(str, 10);

    return Number.isNaN(cleared) ? str : cleared.toFixed(0);
  }
  RGBToHex(r: string, g: string, b: string) {
    let red = parseInt(r).toString(16);
    let green = parseInt(g).toString(16);
    let blue = parseInt(b).toString(16);
  
    if (red.length == 1) red = "0" + red;
    if (green.length == 1) green = "0" + green;
    if (blue.length == 1) blue = "0" + blue;
  
    return "#" + red + green + blue;
  }
  selectElement = (id: string) => {
    this.store.dispatch(setSelectedElement({ id }))
  }
}
