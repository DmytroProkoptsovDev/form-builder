import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextAreaComponent implements OnInit {
  
  @Input() onClick: (element: any) => void = () => {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
