import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../users/users.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  @Output() addUser = new EventEmitter<any>()
  opciones: any = [
    {id: 1, 
     name: 'QA - Proveedor',
    },
    {id: 2,
     name: 'PRF - Administrador General'
    },
    {id: 3,
     name: 'PRF - Proveedores'
    },
    {id: 4,
     name: 'Test Role'
      }
  ]
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', Validators.required)
  opcionControl = new FormControl(null,[Validators.required]);
  matcher = new MyErrorStateMatcher();

  addUserFunction(){
    let params = {
      email: this.emailFormControl.value,
      name: this.nameFormControl.value,
      option: this.opcionControl.value
    }
    this.addUser.emit(params)
    this.emailFormControl.setValue('')
    this.nameFormControl.setValue('')
    this.opcionControl.setValue(null)
  }


}



