import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarComponent } from './mostrar.component';

xdescribe('MostrarComponent', () => {
  let component: MostrarComponent;
  let fixture: ComponentFixture<MostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
