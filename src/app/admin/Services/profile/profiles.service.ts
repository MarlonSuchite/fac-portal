import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { ProfileApi } from '../../Interfaces/profile-api';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  apiProfile = environment.apiUrlProfile;
  profiles = [];

  profile = {
    profileId: 1,
    code: 'Nombre',
    description: 'Hola',
    resources: ['ROLE_AUDIT', 'ROLE_PROFILES', 'ROLE_USERS']
  };

  constructor(private http: HttpClient) {}

  getProfiles(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size);
    return this.http.get(`${this.apiProfile}?${param}`);
  }

  getProfile(id: any) {
    const params = new HttpParams().append('id', id.id);
    return this.http.get(`${this.apiProfile}/{id}?${params}`);
  }

  //Agregar perfil
  addProfile(value: ProfileApi) {
    return this.http.post(this.apiProfile, value, {observe: 'response'});
  }

  //Editar perfial
  updateProfile(value: ProfileApi) {
    const params = new HttpParams().append('id', value.profileId);
    return this.http.put(`${this.apiProfile}/{id}?${params}`, value, {observe: 'response'});
  }
}
