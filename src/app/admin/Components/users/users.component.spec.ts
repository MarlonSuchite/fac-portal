import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminModule } from '../../admin.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../Services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Rx from 'rxjs';

fdescribe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let router: Router;
  let userService: UserService;
  const mockResponse = {
    content: [
      {
        userId: 1,
        email: 'correo.prueba@gmail.com',
        name: 'Prueba Prueba',
        profileId: 1,
        status: true
      }
    ],
    number: 1,
    numberOfElements: 1,
    size: 1,
    sort: {
      empty: true
    },
    totalElements: 1,
    totalPages: 1
  };
  const mockActivatedRouter = {
    queryParams: Rx.of({
      page: 1,
      size: 1,
      sort: ''
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [UsersComponent],
      providers: [
        UserService,
        Router,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRouter
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the correct parameters to the variables', () => {
    spyOn(userService, 'getUsers').and.callFake(() => Rx.of(mockResponse));
    component.firstCall();
    expect(component.totalElements).toBe(mockResponse.totalElements);
    expect(component.users).toBe(mockResponse.content);
  });

  it('rutas', () => {
    spyOn(userService, 'getUsers').and.callFake(() => Rx.of(mockResponse));
    const activatedRoute: ActivatedRoute =
      fixture.debugElement.injector.get(ActivatedRoute);
    component.params();

    activatedRoute.queryParams.subscribe(params => {
      expect(component.page).toBe(params['page']);
      expect(component.users).toBe(mockResponse.content);
    });
  });
});
