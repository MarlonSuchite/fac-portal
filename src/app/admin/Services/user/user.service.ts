import { Injectable } from '@angular/core';
import { UserApi } from '../../Interfaces/user-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { ContentApi } from '../../Interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //obtener todos los usuarios
  getUsers(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size);
    return this.http.get<ContentApi>(`${this.api}?${param}`);
  }

  //Obtener un solo usuario
  getUser(id: any) {
    const param = new HttpParams().append('id', id.id);
    return this.http.get<UserApi>(`${this.api}/{id}?${param}`);
  }

  //Agregar usario
  addNewUser(value: UserApi) {
    return this.http.post(this.api, value);
  }

  //Mdificar usuario
  updateUser(value: UserApi) {
    const param = new HttpParams().append('id', value.userId);
    return this.http.put(`${this.api}/{id}?${param}`, value);
  }
}
