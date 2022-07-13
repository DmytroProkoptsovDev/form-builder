import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { nanoid } from 'nanoid'
import { IDragable, TDragableInstance } from 'src/app/models/drabable.model';



@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.scss']
})
export class DragSectionComponent implements OnInit {
  dragable: IDragable[] = [];
  temp: IDragable[] = [];
  instanceTypes: TDragableInstance[] = [
    'input',
    'button',
    'textarea',
    'checkbox',
    'select'
  ];
  
  constructor() {}

  ngOnInit(): void {
    this.dragable = this.instanceTypes.map(type => ({ id: nanoid(), type }));
  }

  drop(event: CdkDragDrop<IDragable[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        this.temp,
        event.previousIndex,
        event.currentIndex,
      );
      this.temp.length = 0;
    }
  }
}
