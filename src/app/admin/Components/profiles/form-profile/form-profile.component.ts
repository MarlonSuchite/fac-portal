import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyErrorStateMatcher } from '../profiles.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from '../../../Services/profile/profiles.service';
import { ProfileApi } from '../../../Interfaces/profile-api';
import { AlertService } from 'src/app/shared/Services/alert/alert.service';
import { FormValidations } from 'src/app/utils/form-validations';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
  mode: 'add' | 'edit';
  profiles: ProfileApi;
  copyProfile: ProfileApi[] = [];
  buttonStatus: boolean;
  open = true;
  rolesApi: any[] = [];
  roles: any[] = [
    {
      id: 1,
      name: this.translate.instant('roles.configuration.configuration'),
      selected: false,
      items: [
        {
          id: 3,
          name: this.translate.instant('roles.configuration.profiles'),
          role: 'ROLE_PROFILES',
          selected: false
        },
        {
          id: 4,
          name: this.translate.instant('roles.configuration.users'),
          role: 'ROLE_USERS',
          selected: false
        }
      ]
    },
    {
      id: 21,
      name: this.translate.instant('roles.queries.queries'),
      selected: false,
      items: [
        {
          id: 22,
          name: this.translate.instant('roles.queries.audit'),
          role: 'ROLE_AUDIT',
          selected: false
        }
      ]
    }
  ];
  module: any[] = [
    { id: 11, name: 'Configuraciones' },
    { id: 21, name: 'Coments' }
  ];

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private _profileService: ProfilesService,
    private router: Router,
    private _alertService: AlertService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.mode = 'add';
    this.params();
  }
  params(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        this.desactivar(false);
        this._profileService.getProfile(params).subscribe({
          next: (res: ProfileApi) => {
            this.form.setValue({
              name: res.code,
              description: res.description
            });
            this.rolesApi = res.resources;
            this.profiles = res;
            this.copyProfile.push(res);
            this.buttonStatus = true;
            this.setearToggle(this.roles, res.resources);
          }
        });
      } else {
        this.form.reset();
        this.desactivar(false);
      }
    });
  }

  setearToggle(elements: any[], resources: string[]): void {
    elements.forEach(element => {
      element.items.forEach(item => {
        //Verificar si el rol existe la respuesta
        if (resources.includes(item.role)) {
          item.selected = true;
        }
        if (item.itemChild) {
          item?.itemChild.forEach(itemChild => {
            //Verificar si el rol existe la respuesta
            if (resources.includes(itemChild.role)) {
              itemChild.selected = true;
            }
          });
        }
      });
      const selected = element.items.every(item => item.selected);
      element.selected = selected;
    });
  }

  //Formulario
  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, FormValidations.textOnly]],
      description: ['', Validators.required]
    });
    this.changesObject();
  }

  toggle(event: any, id: string) {
    this.roles.forEach((element, i) => {
      if (element.id === id) {
        element.items.forEach(items => {
          items.selected = event.checked;
          if (event.checked) {
            this.addRoles(items.role);
          } else if (!event.role) {
            this.deleteRoles(items.role);
          }
        });
      } else {
        element.items.forEach(items => {
          if (items.id === id) {
            if (event.checked) {
              items.selected = event.checked;
              this.addRoles(items.role);
            } else if (!event.checked) {
              items.selected = event.checked;
              this.deleteRoles(items.role);
            }
          }
        });
      }
      const selected = element.items.every(item => item.selected);
      element.selected = selected;
    });
  }

  addRoles(item: string) {
    const existe = this.rolesApi.find(rol => rol === item);
    if (!existe) {
      this.rolesApi.push(item);
    }
  }

  deleteRoles(item: string) {
    this.rolesApi = this.rolesApi.filter(rol => rol !== item);
  }

  //Desactivar todo
  desactivar(event: boolean) {
    this.roles.forEach(element => {
      element.selected = event;
      element.items.forEach(items => {
        items.selected = event;
        if (items.role) {
          items.selected = event;
        } else {
          items?.itemChild.forEach(itemChild => {
            itemChild.selected = event;
          });
        }
      });
    });
  }

  //Agregar
  action(): void {
    if (this.mode === 'add') {
      const profile: ProfileApi = {
        resources: this.rolesApi,
        profileId: null,
        description: this.form.get('description').value,
        code: this.form.get('name').value,
        status: 1
      };

      //Servicio
      this._profileService.addProfile(profile).subscribe({
        next: (res: any) => {
          this.addEvent.emit('Perfil agregado');
          this._alertService.mostrarAlerta(
            'success',
            `${res.status} Se agrego correctamente`
          );
        },
        error: (err: any) => {
          this._alertService.mostrarAlerta(
            'error',
            `${err.status} Hubo un problema`
          );
        }
      });

      //Resetear los valores del formulario
      this.form.reset();
      this.desactivar(false);
      this.rolesApi = [];
    } else {
      const profile: ProfileApi = {
        profileId: this.profiles.profileId,
        code: this.form.get('name').value,
        description: this.form.get('description').value,
        resources: this.rolesApi,
        status: 1
      };
      this._profileService.updateProfile(profile).subscribe({
        next: (res: any) => {
          this.params();
          this._alertService.mostrarAlerta(
            'success',
            `${res.status} Usuario editado`
          );
          this.addEvent.emit('Perfil editado');
          this.form.reset();
        },
        error: (err: any) => {
          this._alertService.mostrarAlerta(
            'error',
            `${err.status} Hubo un problema`
          );
        }
      });
    }
  }

  changeMode() {
    this.mode = 'add';
    this.router.navigate(['/admin/profiles'], { queryParams: {} });
    this.buttonStatus = false;
  }

  changesObject(): void {
    this.form.valueChanges.subscribe(res => {
      if (this.mode === 'edit') {
        this.copyProfile.forEach(element => {
          if (
            element.code === res.name &&
            element.description === res.description
          ) {
            this.buttonStatus = true;
          } else {
            console.log('entre false');
            this.buttonStatus = false;
          }
        });
      }
    });
  }
}
