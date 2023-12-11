import { Component,Injectable } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-payer-form',
  templateUrl: './payer-form.component.html',
  styleUrls: ['./payer-form.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class PayerFormComponent {
  
  constructor(
   // public dictionary: MplanDictionaryService,
    public form: FormsService,
    public ModalService: ModalService
  )
  {}
}
