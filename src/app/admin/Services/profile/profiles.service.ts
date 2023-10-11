import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  apiProfile = environment.apiUrlProfile
  profiles = [
  ];

  profile = {
    profileId: 1,
    code: 'Nombre',
    description: 'Hola',
    resources: ['ROLE_AUDIT', 'ROLE_PROFILES', 'ROLE_USERS']
  };

  constructor(
    private http: HttpClient
  ){}

  getProfiles(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size)
    return this.http.get(`${this.apiProfile}?${param}`);
  }

  getProfile(id: any) {
    return this.profile;
  }

  //Agregar perfil
  addProfile(value: any){
    return this.http.post(this.apiProfile, value)
  }
}
