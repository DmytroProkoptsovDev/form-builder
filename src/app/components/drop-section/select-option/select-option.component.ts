import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {

  @Input() onClick: (element: any) => void = () => { };

  constructor() { }

  ngOnInit(): void {
  }

}
