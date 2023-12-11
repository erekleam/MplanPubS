import { Component,OnInit,ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './services/forms.service';
import { MplanAddDictionaryService } from './services/mplan-add-dictionary.service';


@Component({
  selector: 'app-mplan-add',
  templateUrl: './mplan-add.component.html',
  styleUrls: ['./mplan-add.component.scss']
})
export class MplanAddComponent {
  @ViewChild('tabset', { static: false }) public staticTabs: TabsetComponent;
  constructor(
    public form: FormsService,
    private readonly route: ActivatedRoute,
    private title : Title,
    public dictionary : MplanAddDictionaryService,
  ) { }
  public ngOnInit(): void {
    this.title.setTitle('MPLAN');
  }

}
