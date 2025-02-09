import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss']
})
export class ExSubsectionComponent implements OnInit {
  percent = 50;
  colors = [
    { color: '#f56c6c', percent: 20 },
    { color: '#e6a23c', percent: 40 },
    { color: '#5cb87a', percent: 60 },
    { color: '#1989fa', percent: 80 }
  ];
  constructor() {}

  ngOnInit() {}

  plus(num: number) {
    if ((this.percent === 0 && num === -10) || (this.percent === 100 && num === 10)) return;
    this.percent = this.percent + num;
  }
}
