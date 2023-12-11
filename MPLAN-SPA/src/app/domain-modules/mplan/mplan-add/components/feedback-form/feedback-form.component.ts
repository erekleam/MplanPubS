import { Component } from '@angular/core';
import { FormsService } from '../../services/forms.service';
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {
  constructor(
    public form: FormsService
  )
  {}
}
