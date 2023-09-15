import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Peticiones } from '../../interfaces/peticiones';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  displayedColumns: string[] = ['identifier', 'date', 'entity', 'user', 'operation'];
  @Input() dataSource: Peticiones[] = [];
  tableDataSource = new MatTableDataSource<Peticiones>(this.dataSource);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  //Detectar cambiar a la hora de buscar
  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSource = new MatTableDataSource<Peticiones>(this.dataSource);
    this.tableDataSource.paginator = this.paginator;
  }
  
  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    console.log(this.tableDataSource.paginator)
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

}