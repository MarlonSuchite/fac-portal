import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  mostrarAlerta(icono: any, message: string) {
    const Toast = Swal.mixin({
      toast: true, //Color de fondo
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000, //tiempo
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icono,
      title: message
    });
  }
}
