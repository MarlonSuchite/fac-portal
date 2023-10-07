import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() params: any;
  @Output() clickParam = new EventEmitter<any>();

  clickParamEvent(value: any) {
    console.log('Emitiendo desde lista', value);
    this.clickParam.emit(value);
  }
}
