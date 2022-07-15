import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit, AfterViewInit {

  @Input() onClick: (id: any) => void = () => { };
  @Input() onViewInit: (element: any) => void = () => { };
  @Input() id: string = '';
  @ViewChild('select') selectRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.selectRef;

      this.onViewInit(nativeElement)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
