import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() onClick: (id: any) => void = () => { };
  @Input() onViewInit: (element: any) => void = () => { };
  @Input() id: string = '';
  @ViewChild('button') buttonRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.buttonRef;

      this.onViewInit(nativeElement)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
