import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyErrorStateMatcher } from '../profiles/profiles.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';
import { ProfilesService } from '../../Services/profile/profiles.service';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>()

  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
  mode: 'add' | 'edit';
  open = true;
  rolesApi: any[] = [];
  roles: any[] = [
    {
      id: 1,
      name: this.translate.instant('roles.configuration.configuration'),
      selected: false,
      items: [
        {
          id: 2,
          name: this.translate.instant('roles.configuration.security'),
          role: '',
          selected: false,
          itemChild: [
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
    private _profileService: ProfilesService
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
        const profile = this._profileService.getProfile(params);
        this.rolesApi = profile.resources;
        this.form.setValue({
          name: profile.code,
          description: profile.description
        });
        this.recursiveSelect(this.roles, profile.resources);
      } else {
        this.form.reset();
        this.desactivar(false);
      }
    });
  }

  recursiveSelect(elements: any[], resources: string[]): void {
    for (const element of elements) {
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
    }
  }

  //Formulario
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  toggle(event: any, id: string) {
    const elemento = this.recorrerElemento(this.roles, id);
    if (elemento) {
      elemento.selected = event.checked;
      this.activar(event.checked, elemento);
    }
    console.log(this.rolesApi);
  }

  toggleChild(event: any, id: number) {
    for (const rol of this.roles) {
      rol.items.forEach(items => {
        if (items.id === id && event.checked) {
          items.selected = event.checked;
          this.agregarRoles(items.role);
        } else if (items.id === id && !event.checked) {
          items.selected = event.checked;
          this.aliminarRoles(items.role);
        }
        if (items.itemChild) {
          items?.itemChild.forEach(itemChild => {
            if (itemChild.id === id && event.checked) {
              itemChild.selected = event.checked;
              this.agregarRoles(itemChild.role);
            } else if (itemChild.id === id && !event.checked) {
              itemChild.selected = event.checked;
              this.aliminarRoles(itemChild.role);
            }
          });
        }
      });
    }
  }

  recorrerElemento(elements: any[], id: string): any {
    for (const element of elements) {
      if (element.id === id) {
        return element;
      } else if (element.items && element.items[0].id === id) {
        const item = this.recorrerElemento(element.items, id);
        if (item) return item;
      }
    }
    return null;
  }

  activar(event: boolean, element: any) {
    if (element.items) {
      for (const item of element.items) {
        item.selected = event;
        if (item.role && event) {
          this.agregarRoles(item.role);
        } else if (item.role && !event) {
          this.aliminarRoles(item.role);
        }
        this.activar(event, item);
      }
    }
    if (element.itemChild) {
      for (const itemChild of element.itemChild) {
        itemChild.selected = event;
        if (event) {
          this.agregarRoles(itemChild.role);
        } else if (!event) {
          this.aliminarRoles(itemChild.role);
        }
      }
    }
  }

  agregarRoles(item: string) {
    const existe = this.rolesApi.find(rol => rol === item);
    if (!existe) {
      this.rolesApi.push(item);
    }
  }

  aliminarRoles(item: string) {
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
    if(this.mode === 'add'){
      const profile = {
        resources: this.rolesApi,
        id: null,
        description: this.form.get('description').value,
        code: this.form.get('name').value,
        status: 1
      };
      this.form.reset();
      this.desactivar(false);
      this.rolesApi = [];
      this._profileService.addProfile(profile).subscribe({
        next: res => {
          this.addEvent.emit('Perfil agregado')
        }
      })
    }else {
      /* 
        Hacer el archivo de constantes
      */
    }

    }
}
