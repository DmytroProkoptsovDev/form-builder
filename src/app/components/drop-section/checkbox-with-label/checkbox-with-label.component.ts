import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-with-label',
  templateUrl: './checkbox-with-label.component.html',
  styleUrls: ['./checkbox-with-label.component.scss']
})
export class CheckboxWithLabelComponent implements OnInit {

  @Input() onClick: (element: any) => void = () => { };

  constructor() { }

  ngOnInit(): void {
  
  }

}
