import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextAreaComponent implements OnInit, AfterViewInit {

  @Input() onClick: (id: any) => void = () => { };
  @Input() onViewInit: (element: any) => void = () => { };
  @Input() id: string = '';
  @ViewChild('textarea') textareaRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const { nativeElement } = this.textareaRef;

      this.onViewInit(nativeElement)
  });
  }
  sendId() {
    this.onClick(this.id)
  }
}
