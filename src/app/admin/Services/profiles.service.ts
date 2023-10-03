import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  profiles = [
    { id: 1, name: 'QA - Proveedor' },
    { id: 2, name: 'PRF - Administrador General' },
    { id: 3, name: 'PRF - Proveedores' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' },
    { id: 4, name: 'Test Role' }
  ];

  getProfiles() {
    return this.profiles;
  }

  getProfile(id: any) {
    return this.profiles.filter(m => m.id == id);
  }
}
