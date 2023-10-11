import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ProfilesService } from '../../Services/profile/profiles.service';
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
export class ProfilesComponent implements OnInit {
  searchValue = new FormControl('');
  profiles: any[] = [];
  page = 1;
  search = '';
  sort = ''
  size = 10
  pageSize = 10
  pageSizeOptions = [10];
  totalElements = 0;
  param = {
    page: this.page,
    size: this.size,
    sort: this.sort
  };


  constructor(
    private _profileService: ProfilesService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.firstCall()
    this.params()
  }

  firstCall() {
    this._profileService.getProfiles(this.param).subscribe({
      next: (res: any) => {
        this.totalElements = res.totalElements
        this.profiles = res.content
      }
    })
  }

  params() {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = params['page'];
        // this.search = params['search'];
        this._profileService.getProfiles(params).subscribe({
          next: (res: any) => {
            this.profiles = res.content
          }
        })
      }
    });
  }

  //Obtener un perfil
  clickProfile(valor: any): void {
    this.router.navigate(['/admin/profiles'], { queryParams: { id: valor } });
  }

  //Numero de pagina
  getPage(event: any): void {
    this.router.navigate(['/admin/profiles'], {
      queryParams: {
        page: event.pageIndex + 1,
        search: this.search,
        size: this.size,
        sort: this.sort
      }
    });
  }

  //Parametro de busqueda
  searchParams(): void {
    this.router.navigate(['/admin/profiles'], {
      queryParams: {
        page: 0,
        search: this.searchValue.value
      }
    });
  }


}
