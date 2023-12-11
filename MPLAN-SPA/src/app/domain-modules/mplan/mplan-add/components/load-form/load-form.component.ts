import { Component } from '@angular/core';
import { containerSizesList, shipmentTypesList, signTypesList, vagonTypesList } from '../../../models/full-mplan.model';
import { ModalService } from 'src/app/modals/modal.service';
import { MplanAddDictionaryService } from '../../services/mplan-add-dictionary.service';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-load-form',
  templateUrl: './load-form.component.html',
  styleUrls: ['./load-form.component.scss']
})
export class LoadFormComponent {
  public shipmentTypeName: shipmentTypesList;
  public signTypeName: signTypesList;
  public vagonTypeName: vagonTypesList;
  public containerSizesName:containerSizesList;
  constructor(
    
   public dictionary: MplanAddDictionaryService,
   public form: FormsService,
   public ModalService : ModalService
  )
  {
    this.dictionary.getThirdDictionaries().subscribe( res => {
      this.shipmentTypeName = res;
    })

    this.dictionary.getFourthDictionaries().subscribe( res => {
      this.signTypeName = res;
    })
    this.dictionary.getFifthDictionaries().subscribe( res => {
      this.vagonTypeName = res;
    })
    this.dictionary.getSixthDictionaries().subscribe( res => {
      this.containerSizesName = res;
    })
  }
}
