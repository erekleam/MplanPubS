import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MplanAddDictionaryService } from './mplan-add-dictionary.service';
import { data } from 'jquery';
import { MplanFull, MplanGetList, MplanHeader, MplanMestranDetails } from '../../models/full-mplan.model';
import { IHeaderResponse } from '../../models/header-response';
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public headerResponse!: IHeaderResponse;
  public MplanModels!: MplanGetList;

  public headerForm!: FormGroup;
  public MplanMestranDetailsForm= this.fb.array([]);
  public countryForm! : FormGroup;
  public FeedbackForm!: FormGroup;
  public payerForm!: FormGroup;
  public loadForm!: FormGroup;
  public loadFormS!: FormGroup;
  public firstInde = new FormControl({value:"", disabled: true});
  public numOfTr = 0;
  public isLastRow = false;
  public isVagon = false;
  public detailsForm: FormArray;
  public routeStationsForm!: FormArray;
  public headerID = 0;

  constructor(public fb: FormBuilder, private router: Router, public dictionary: MplanAddDictionaryService) {
    this.createCountryForm();
    this.createDetailsForm();
    this.CreateFeedbackForm();
    this.CreatePayerForm();
    this.CreateheaderForm();
    this.CreateloadForm();
    this.CreateloadSForm();
    this.statemType();
   }
   public createCountryForm(): void {
    this.countryForm = this.fb.group({
        senderCountry: new FormControl('268'),
        senderCountryText: new FormControl('ГРУЗИЯ'),
        // senderNote: new FormControl(''),

        senderStation: new FormControl(''),
        senderStationText: new FormControl(''),
        // senderStationNote: new FormControl(''),

        ReceiverCountry: new FormControl(''),
        ReceiverCountryText: new FormControl(''),
        // ReceiverCountryNote: new FormControl(''),

        ReceiverStation: new FormControl(''),
        ReceiverStationText: new FormControl(''),
        // ReceiverStationNote: new FormControl(''),

        TransportingAdministrationCode: new FormControl(''),
        TransportingAdministration: new FormControl(''),
        ReceiverDockingCode: new FormControl(''),
        ReceiverDockingSpot: new FormControl(''),
        Code: new FormControl(''),
        Forwarder: new FormControl('')
        
    });
  }

  

  public CreateFeedbackForm(): void{
    this.FeedbackForm = this.fb.group({
      FeedbackNote: new FormControl('')
    });
  }
  
  public CreatePayerForm(): void{
    this.payerForm = this.fb.group({
      LoadSender: new FormControl(''),
      LoadSenderText: new FormControl(''),
      // LoadSenderNote: new FormControl(''),

      LoadReciever: new FormControl(''),
      LoadRecieverText: new FormControl(''),
      // LoadRecieverNote: new FormControl(''),

      PortLoadReciever: new FormControl(''),
      PortLoadRecieverText: new FormControl(''),
      // PortLoadRecieverNote: new FormControl(''),

      Port: new FormControl(''),
      PortText: new FormControl('')
      // PortNote: new FormControl('')
    });
  }
  public CreateheaderForm(): void{
    this.headerForm = this.fb.group({
      StatementType: new FormControl(''),
      FileType: new FormControl(''),
      dateFrom: new FormControl(''),

      LoadType: new FormControl('')
    });
  }


  public CreateloadForm(): void{
    this.loadForm = this.fb.group({
      gzavnilisSaxeoba: new FormControl(''),
      tvirtiGNG: new FormControl(''),
      tvirtiGNGText: new FormControl(''),
      tvirtiWona: new FormControl(''),
      Nishani: new FormControl('')
    });
  }


  public CreateloadSForm(): void{
    this.loadFormS = this.fb.group({
      VagonisSaxeoba: new FormControl(''),
      VagonisRaodenoba: new FormControl(''),
      konteinerisZoma: new FormControl(''),
      konteinerisRaodenoba: new FormControl('')
    });
  }
  


  public deleteRow(index: number) {
    this.detailsForm.removeAt(index);
    this.numOfTr++;

    let rowCount = this.detailsForm?.controls?.length;
    
    if(rowCount == 1){
      this.isLastRow = true;
      
    }

    

  }
  public statemType() {
    if(this.loadForm.value.gzavnilisSaxeoba=="1") {
      this.isVagon= true;
      
      
    }
    else{
      this.isVagon= false;
    }
    
  }

  public addRow() {
    this.detailsForm.push(
      this.fb.group({
        TransportingAdministrationCode: new FormControl(''),
        TransportingAdministration: new FormControl(''),
        ReceiverDockingCode: new FormControl(''),
        ReceiverDockingSpot: new FormControl(''),
        Code: new FormControl(''),
        Forwarder: new FormControl('')
      }));

      let rowCount = this.detailsForm?.controls?.length;
    
      if(rowCount != 1){
        this.isLastRow = false;

      }

  }

  public createDetailsForm(){
    this.detailsForm = this.fb.array([]);
    this.isLastRow=true;
  }

  public save(){
    // this.headerForm?.markAllAsTouched();
    // this.countryForm?.markAllAsTouched();
    // this.detailsForm?.markAllAsTouched();
    // this.FeedbackForm?.markAllAsTouched();
    // this.payerForm?.markAllAsTouched();
    // this.loadForm?.markAllAsTouched();
    // this.loadFormS?.markAllAsTouched();

  

    const json = {
      Header:{     
      StatementType: this.headerForm.value.StatementType,
      FileType: this.headerForm.value.FileType,
      DateFrom: this.headerForm.value.dateFrom,
      LoadType: this.headerForm.value.LoadType,
      SenderCountry: this.countryForm.value.senderCountry,
      SenderCountryText: this.countryForm.value.senderCountryText,
      SenderStation: this.countryForm.value.senderStation,
      SenderStationText: this.countryForm.value.senderStationText,
      ReceiverCountry: this.countryForm.value.ReceiverCountry,
      ReceiverCountryText: this.countryForm.value.ReceiverCountryText,
      ReceiverStation: this.countryForm.value.ReceiverStation,
      ReceiverStationText: this.countryForm.value.ReceiverStationText,
      GzavnilisSaxeoba: this.loadForm.value.gzavnilisSaxeoba,
      TvirtiGNG: this.loadForm.value.tvirtiGNG,
      TvirtiGNGText: this.loadForm.value.tvirtiGNGText,
      TvirtiWona: this.loadForm.value.tvirtiWona,
      Nishani: this.loadForm.value.Nishani,
      VagonisSaxeoba: this.loadFormS.value.VagonisSaxeoba,
      VagonisRaodenoba: this.loadFormS.value.VagonisRaodenoba,
      KonteinerisZoma: this.loadFormS.value.konteinerisZoma,
      KonteinerisRaodenoba: this.loadFormS.value.konteinerisRaodenoba,
      LoadSender: this.payerForm.value.LoadSender,
      LoadSenderText: this.payerForm.value.LoadSenderText,
      LoadReciever: this.payerForm.value.LoadReciever,
      LoadRecieverText: this.payerForm.value.LoadRecieverText,
      // PortLoadReciever: this.payerForm.value.PortLoadReciever,
      // PortLoadRecieverText: this.payerForm.value.PortLoadRecieverText,
      // Port: this.payerForm.value.Port,
      // PortText: this.payerForm.value.PortText,
      FeedbackNote: this.FeedbackForm.value.FeedbackNote
      },
      Details: [],
    }
  
      for (const item of this.detailsForm.controls) {
        json.Details.push({
          TransportingAdministrationCode: item.value.TransportingAdministrationCode,
          TransportingAdministration: item.value.TransportingAdministration,
          ReceiverDockingCode: item.value.ReceiverDockingCode,
          ReceiverDockingSpot: item.value.ReceiverDockingSpot,
          Code: item.value.Code,
          Forwarder: item.value.Forwarder,
        })
      } 
      swal.fire("გეგმა წარმატებით შეინახა");

      this.dictionary.insertData(json).subscribe(
        (data) => {
          if(data) {
            this.router.navigate([`/mplan/${data.headerId}`]);
            
          }
        //  else {
        //   this.index = 0;
        //   this.getFullMplanOperation(this.headerID)
        // }

        }
      )

    }
    public addDetails(item?: MplanMestranDetails): void { 
      if (item) {         
        this.detailsForm.push(
          this.fb.group({
            TransportingAdministrationCode: new FormControl(item.transportingAdministrationCode),
            TransportingAdministration: new FormControl(item.transportingAdministration),
            ReceiverDockingCode: new FormControl(item.receiverDockingCode),
            ReceiverDockingSpot: new FormControl(item.receiverDockingSpot),
            Code: new FormControl(item.code),
            Forwarder: new FormControl(item.forwarder)
          })
        );      
      }
    }
    opensweetalert(index: number){
      swal.fire({
        title: 'ნამდვილად გსურთ წაშლა?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'დიახ!',
        cancelButtonText: 'გაუქმება',
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.deleteRow(index);
          
        }
      })
    }
}
