import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';
import { getFieldStylesToApply } from '../../accordion/accordion.selectors';

@Component({
  selector: 'app-checkbox-with-label',
  templateUrl: './checkbox-with-label.component.html',
  styleUrls: ['./checkbox-with-label.component.scss']
})
export class CheckboxWithLabelComponent implements OnInit, AfterViewInit {
  @Input() onClick!: (id: any) => void;
  @Input() onViewInit!: (element: any, name: string) => void;
  @Input() elementName!: string;
  @Input() id!: string;

  @ViewChild('checkbox') checkboxRef!: ElementRef;

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
  ) {}

  ngOnInit(): void {
    this.store.select(getFieldStylesToApply(this.id)).subscribe(styles => {
      this.propertyService
        .setProps(styles)
        .setRef(this.checkboxRef)
        .applyAllProperties();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.checkboxRef;

      this.onViewInit(nativeElement, this.elementName)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
