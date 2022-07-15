import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input() onClick: (id: any) => void = () => { };
  @Input() onViewInit: (element: any) => void = () => { };
  @Input() id: string = '';
  @ViewChild('input') inputRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.inputRef;

      this.onViewInit(nativeElement)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
