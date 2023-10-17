import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Peticiones } from '../../interfaces/peticiones';
@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnChanges {
  displayedColumns: string[] = [
    'order',
    'customer',
    'amount',
    'taxes',
    'total'
  ];
  @Input() dataSource: Peticiones[] = [];
  tableDataSource = new MatTableDataSource<Peticiones>(this.dataSource);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Detectar cambiar a la hora de buscar
  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSource = new MatTableDataSource<Peticiones>(this.dataSource);
    this.tableDataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    console.log(this.tableDataSource.paginator);
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }
}
