import { IDragable } from 'src/app/models/drabable.model';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectElement } from './drop-section.actions';

const props = [
  'width',
  'height',
  'font-size',
  'font-weight',
  'color',
  'border-style',
]

@Component({
  selector: 'app-drop-section',
  templateUrl: './drop-section.component.html',
  styleUrls: ['./drop-section.component.scss']
})
export class DropSectionComponent implements OnInit {
  public formDropContainer: IDragable[] = [];

  constructor(private store: Store) {}
  ngOnInit(): void {

  }
  defineElement = (element: any) => {
    const computedCSS = window.getComputedStyle(element, ':placeholder');
    
    const id = { id: element.id };
    const textContent = { textContent: element.textContent };
    const placeholder = { placeholder: element.placeholder ?? '' };
    const definedProps = props.reduce((obj: any, prop: string) => {
      obj[prop] = computedCSS.getPropertyValue(prop);
      return obj;
    }, {});
    
    const elementDetails = {
      ...textContent,
      ...placeholder,
      ...definedProps,
      ...id,
    };

    this.store.dispatch(selectElement({ payload: elementDetails }));
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
  }
}
