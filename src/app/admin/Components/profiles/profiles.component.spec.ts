import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesComponent } from './profiles.component';
import { SharedModule } from 'src/app/shared/shared.module';

xdescribe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ProfilesComponent],
    });
    
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agregar más pruebas según sea necesario
});

