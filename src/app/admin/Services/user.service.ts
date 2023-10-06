import { Injectable } from '@angular/core';
import { UserApi } from '../Interfaces/user-api';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      content: [],
      totalElements: 20,
      totalPages: 2
    }
  ];

  user: UserApi = {
    id: 29,
    email: 'ecoronado@is4tech.com',
    name: 'Eliezer Coronado',
    status: true,
    profile: {
      id: 1,
      name: 'QA-Proveedor',
      description: 'QA Perfil proveedor',
      providerProfile: false,
      status: true
    }
  };

  constructor(private http: HttpClient) {}

  getUsers(params: any) {
    const param = new HttpParams()
      .append('page', params.page - 1)
      .append('sort', params.sort)
      .append('size', params.size);
    console.log('Pagina desde el servicio', params.page - 1);
    return this.http.get(
      `http://localhost:8085/fac-services/api/user?${param}`
    );
  }

  getUser(id: any): UserApi {
    return this.user;
  }

  //Agregar usario
  addNewUser(value: any) {
    console.log(value);
    return this.http.post('http://localhost:8085/fac-services/api/user', value);
  }

  updateUser(value: any) {
    console.log(value);
  }
}
