import { Injectable } from '@angular/core';
import { UserApi } from '../../Interfaces/user-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.apiUrl;

  user = {
    id: 5,
    email: 'esramirez@diunsa.hn',
    name: 'Estuardo Ramirez',
    status: true,
    profile: {
      id: 1,
      name: 'PRF - Administrador General',
      description: 'Perfil para administradores',
      providerProfile: false,
      status: true
    }
  };

  constructor(private http: HttpClient) {}

  //obtener todos los usuarios
  getUsers(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size);
    return this.http.get(`${this.api}?${param}`);
  }

  //Obtener un solo usuario
  getUser(id: any) {
    const param = new HttpParams().append('id', id.id);
    return this.http.get<UserApi>(`${this.api}/{id}?${param}`);
  }

  //Agregar usario
  addNewUser(value: UserApi) {
    return this.http.post(this.api, value, { observe: 'response' });
  }

  //Mdificar usuario
  updateUser(value: UserApi) {
    const param = new HttpParams().append('id', value.userId);
    return this.http.put(`${this.api}/{id}?${param}`, value, {
      observe: 'response'
    });
  }

  //Obtener usuario logeado
  getLoggedUser(id: number) {
    return this.user;
  }
}
