import { Component } from '@angular/core';
import { XSize } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  model = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];
}
