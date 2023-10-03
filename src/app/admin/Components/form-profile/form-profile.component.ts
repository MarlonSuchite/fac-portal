import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../profiles/profiles.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent {
  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
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
            { id: 3, name: this.translate.instant('roles.configuration.profiles'), role: 'ROLE_PROFILES', selected: false },
            { id: 4, name: this.translate.instant('roles.configuration.users'), role: 'ROLE_USERS', selected: false }
          ]
        }
      ]
    },
    {
      id: 21,
      name: this.translate.instant('roles.queries.queries'),
      selected: false,
      items: [
        { id: 22, name: this.translate.instant('roles.queries.audit'), role: 'ROLE_AUDIT', selected: false }
      ]
    }
  ];
  module: any[] = [
    { id: 11, name: 'Configuraciones' },
    { id: 21, name: 'Coments' }
  ];

  constructor
  (
    private fb: FormBuilder,
    private translate: TranslateService
    ) {
    this.buildForm();
  }

  //Formulario
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  toogle(event: any, id) {
    this.roles.forEach(element => {
      if (element.id === id) {
        element.selected = event.checked;
        element?.items.forEach(items => {
          items.selected = event.checked;
          if (items.role !== '' || items.role.length !== 0) {
            this.rolesApi.push(items.role);
            console.log(this.rolesApi);
          }
          if (items?.itemChild) {
            items?.itemChild.forEach(itemChild => {
              itemChild.selected = event.checked;
              this.rolesApi.push(itemChild.role);
            });
          }
        });
      }
    });
  }

  toogle2(event: any, id) {
    this.roles.forEach(element => {
      element.items.forEach(items => {
        if (items.id === id) {
          items?.itemChild.forEach(itemChild => {
            itemChild.selected = event.checked;
          });
        }
      });
    });
  }
}
