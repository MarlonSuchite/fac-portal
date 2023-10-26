import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'orderId',
    'customer',
    'products',
    'totalPrice',
    'action'
  ];

  constructor(
    private paginatorInt: MatPaginatorIntl,
    private router: Router
  ) {}

  @Input() data: any[] = [];
  tableDataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Detectar cambiar a la hora de buscar
  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSource = new MatTableDataSource<any>(this.data);
    this.tableDataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
    //this.paginatorInt.itemsPerPageLabel = this.message
  }

  updated(id: string) {
    this.router.navigate(['/operation/create'], {
      queryParams: {
        id: id
      }
    });
  }
}
