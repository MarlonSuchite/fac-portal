import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Input() params?: any;
  @Output() clickParam = new EventEmitter<any>();


  ngOnInit(): void {
  console.log(this.params)  
  }


  clickParamEvent(value: any) {
    this.clickParam.emit(value);
  }
}
