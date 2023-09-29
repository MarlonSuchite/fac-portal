import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../profiles/profiles.component';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent {

  matcher = new MyErrorStateMatcher();

  roles: any[] = [
    {
      id: 1,
      name: 'Configuración',
      selected: false,
      items: [
        {
          id: 2,
          name: 'Seguridad',
          role: '',
          selected: false,
          itemChild: [
            { id: 3, name: 'Perfiles', role: 'ROLE_PROFILES', selected: false },
            { id: 4, name: 'Usuarios', role: 'ROLE_USERS', selected: false },
          ],
        },
  
      ],
    },
    {
      id: 21,
      name: 'Consultas',
      selected: false,
      items: [
        { id: 22, name: 'Auditoría', role: 'ROLE_AUDIT', selected: false },
      ],
    },
  ];
  module: any[] =[
    {id: 11, name: 'Configuraciones'},
    {id: 12, name: 'Coments'}
  ]

  toogle(event: any){
    console.log(event)
  }

}
