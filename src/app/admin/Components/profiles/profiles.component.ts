import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm  } from '@angular/forms';
import { ProfilesService } from '../../Services/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit{
  searchValue = new FormControl('');
  profiles: any = []
  profile!: any

  roles: any =[
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
        { id: 22, name: 'Auditoría', role: 'ROLE_AUDIT', selected: false }
      ],
    },
  ]


  constructor(
    private _profileService: ProfilesService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if(params['id']){
        const id = params['id']
        this.profile = this._profileService.getProfile(id)
        console.log(this.profile)
      }
    })
    this.profiles = this._profileService.getProfiles()
  }

  clickProfile(valor: any): void{
    this.router.navigate(['/admin/profiles'], {queryParams: {id: valor}})
  }


  pageSize = 7;
  pageSizeOptions = [7];
}