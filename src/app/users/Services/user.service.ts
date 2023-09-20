import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    { name: 'Marlon Chajon', email: 'mchajon@gmail.com' },
    { name: 'Eduardo Hernandez', email: 'eduardo@gmail.com' },
    { name: 'Paola Suchite', email: 'pao@gmail.com' },
    { name: 'Diego Morales', email: 'diego@gmail.com' },
    { name: 'Carlos Flores', email: 'carlos@gmail.com' },
    { name: 'Jose Muralles', email: 'jose@gmail.com' },
    { name: 'Esteban Cordoba', email: 'esteban@gmail.com' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(email: string) {
    return this.users.filter(m => m.email === email);
  }
}
