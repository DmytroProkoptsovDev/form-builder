import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IDragable } from 'src/app/models/drabable.model';
import { Store } from '@ngrx/store';
import { getAllDragables } from './drag-section.selectors';
import { removeDrabable } from './drag-section.actions';

@Component({
  selector: 'app-drag-section',
  templateUrl: './drag-section.component.html',
  styleUrls: ['./drag-section.component.scss']
})
export class DragSectionComponent implements OnInit {
  dragable: IDragable[] = [];
  temp: IDragable[] = [];
  
  constructor(private store: Store) {
    this.store.select(getAllDragables).subscribe(dragables => this.dragable = dragables);
  }

  ngOnInit(): void {}

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

      const { id } = event.item.element.nativeElement;
      this.store.dispatch(removeDrabable({payload: { id } }));

      this.temp.length = 0;
    }
  }
}
