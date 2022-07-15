import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-with-label',
  templateUrl: './checkbox-with-label.component.html',
  styleUrls: ['./checkbox-with-label.component.scss']
})
export class CheckboxWithLabelComponent implements OnInit, AfterViewInit {
  @Input() onClick: (id: any) => void = () => { };
  @Input() onViewInit: (element: any) => void = () => { };
  @Input() id: string = '';

  @ViewChild('checkbox') checkboxRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.checkboxRef;

      this.onViewInit(nativeElement)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
