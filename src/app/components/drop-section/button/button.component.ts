import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PropertySetterService } from 'src/app/services/property-setter/property-setter.service';
import { getFieldStylesToApply } from '../../accordion/accordion.selectors';
import { getSelectedElement } from '../drop-section.selectors';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @Input() onClick!: (id: any) => void;
  @Input() onViewInit!: (element: any, name: string) => void;
  @Input() elementName!: string;
  @Input() id!: string;
  
  @ViewChild('button') buttonRef!: ElementRef;
  
  public isSelected!: boolean;
  public styles!: any; 

  constructor(
    private store: Store,
    private propertyService: PropertySetterService
  ) {}

  ngOnInit(): void {
    this.store.select(getFieldStylesToApply(this.id)).subscribe(styles => this.styles = styles);
    this.store.select(getSelectedElement).subscribe(id => {
      this.isSelected = id === this.id
    });
  }
  ngAfterViewInit(): void {
      setTimeout(() => {
        const { nativeElement } = this.buttonRef;
        this.onViewInit(nativeElement, this.elementName);
    });
  }
  sendId() {
    this.onClick(this.id)
  }
}
