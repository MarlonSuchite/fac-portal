import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {
    //Constructor
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getRoles() {
    const roles = localStorage.getItem('roles');
    return JSON.parse(roles);
  }

  deleteRoles() {
    localStorage.removeItem('roles');
  }
}
