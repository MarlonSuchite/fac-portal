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
import { Peticiones } from '../../interfaces/peticiones';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {
  displayedColumns: string[] = ['date', 'entity', 'user', 'operation'];

  constructor(
    private paginatorInt: MatPaginatorIntl,
    private translate: TranslateService
  ) {
    this.translate.get('table.itemsPerPageLabel').subscribe();
    this.paginatorInt.itemsPerPageLabel = this.translate.instant(
      'table.itemsPerPageLabel'
    );
  }

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
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
    //this.paginatorInt.itemsPerPageLabel = this.message
  }
}
