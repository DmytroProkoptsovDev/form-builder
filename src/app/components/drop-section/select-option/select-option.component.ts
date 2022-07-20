import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';
import { getFieldStylesToApply } from '../../accordion/accordion.selectors';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit, AfterViewInit {

  @Input() onClick!: (id: any) => void;
  @Input() onViewInit!: (element: any, name: string) => void;
  @Input() elementName!: string;
  @Input() id!: string;
  
  @ViewChild('select') selectRef!: ElementRef;

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
  ) {}

  ngOnInit(): void {
    this.store.select(getFieldStylesToApply(this.id)).subscribe(styles => {
      this.propertyService
        .setProps(styles)
        .setRef(this.selectRef)
        .applyAllProperties();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.selectRef;

      this.onViewInit(nativeElement, this.elementName);
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
