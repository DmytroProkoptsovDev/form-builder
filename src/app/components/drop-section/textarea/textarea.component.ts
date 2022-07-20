import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';
import { getFieldStylesToApply } from '../../accordion/accordion.selectors';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  @Input() onClick!: (id: any) => void;
  @Input() onViewInit!: (element: any, name: string) => void;
  @Input() elementName!: string;
  @Input() id!: string;

  @ViewChild('textarea') textareaRef!: ElementRef;

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
  ) {}

  ngOnInit(): void {
    this.store.select(getFieldStylesToApply(this.id)).subscribe(styles => {
      this.propertyService
        .setProps(styles)
        .setRef(this.textareaRef)
        .applyAllProperties();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.textareaRef;

      this.onViewInit(nativeElement, this.elementName);
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
