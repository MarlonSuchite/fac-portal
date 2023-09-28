import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../profiles/profiles.component';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent {

  matcher = new MyErrorStateMatcher();

}
