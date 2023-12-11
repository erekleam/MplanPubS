import { Component, Injectable } from '@angular/core';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-mplan-action-buttons',
  templateUrl: './mplan-action-buttons.component.html',
  styleUrls: ['./mplan-action-buttons.component.scss']
})
@Injectable({
  providedIn: 'root',
})

export class MplanActionButtonsComponent {
  
  constructor(
    public form: FormsService
    
  ){}
  
}
