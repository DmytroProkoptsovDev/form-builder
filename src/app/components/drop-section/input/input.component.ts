import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';
import { getFieldStylesToApply } from '../../accordion/accordion.selectors';
import { getSelectedElement } from '../drop-section.selectors';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input() onClick!: (id: any) => void;
  @Input() onViewInit!: (element: any, name: string) => void;
  @Input() elementName!: string;
  @Input() id!: string;

  @ViewChild('input') inputRef!: ElementRef;

  public isSelected!: boolean;
  public styles!: any;

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
  ) {}

  ngOnInit(): void {
    this.store.select(getFieldStylesToApply(this.id)).subscribe(styles => {
      this.styles = styles;
      // this.propertyService
      //   .setProps(styles)
      //   .setRef(this.inputRef)
      //   .applyAllProperties();
    });
    this.store.select(getSelectedElement).subscribe(id => {
      this.isSelected = id === this.id
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.inputRef;

      this.onViewInit(nativeElement, this.elementName);
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
