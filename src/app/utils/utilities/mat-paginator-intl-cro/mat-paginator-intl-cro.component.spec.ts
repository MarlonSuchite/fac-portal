import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorIntlCro } from './mat-paginator-intl-cro.component';

describe('MatPaginatorIntlCroComponent', () => {
  let component: MatPaginatorIntlCro;
  let fixture: ComponentFixture<MatPaginatorIntlCro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatPaginatorIntlCro ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatPaginatorIntlCro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
