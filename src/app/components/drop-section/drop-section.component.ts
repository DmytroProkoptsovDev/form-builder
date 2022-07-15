import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectElement, setSelectedElement } from './drop-section.actions';
import { IAppliedStyles } from '../accordion/accordion.actions';
import { getStylesToApply } from '../accordion/accordion.selectors';
import { updateDrabableIds } from '../drag-section/drag-section.actions';
import { IDragable } from 'src/app/models/drabable.model';

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
export class DropSectionComponent implements OnInit {
  public formDropContainer: IDragable[] = [];
  public choosenStyles: IAppliedStyles = {};

  constructor(private store: Store) {
    this.store.select(getStylesToApply).subscribe(styles => this.choosenStyles = styles);
  }
  ngOnInit(): void {}
  
  defineElement = (element: any) => {
    const computedCSS = window.getComputedStyle(element, ':placeholder');
    const nonCSSProps = {
      'text-content': element.textContent ? element.textContent : element.id,
      placeholder: element.placeholder ?? '',
      id: element.id,
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
    this.store.dispatch(updateDrabableIds());
  }
  removeSuffix(str: string): string {
    const cleared = parseInt(str, 10);

    return Number.isNaN(cleared) ? str : cleared.toFixed(0);
  }
  getId = (id: string) => {
    console.log(id);
    this.store.dispatch(setSelectedElement({ id }))
  }
}
