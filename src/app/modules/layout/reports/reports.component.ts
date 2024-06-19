import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CreateDyanamicReportComponentComponent } from '../../layout/create-dyanamic-report-component/create-dyanamic-report-component.component';
import {BsModalRef, BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/ApiService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inputdigit } from '../../../core/interface/sideNavMenu';

@Component({
  selector: 'app-login',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})

export class ReportsComponent implements OnInit {
  @ViewChild('inputDigit') inputDigit?: ElementRef;
  processInputForm!: FormGroup;

  reportId: string | null = null;
  title = 'smartreport';
  totalRows:number = 0;
  tabledatacollection:Array<any>=[];
  columnDataCollection:Array<any>=[];

  // column: Array<any> = [
  //   {
  //   title:'id',
  //   key:'id'
  //   },
  //   {
  //    title:'First Name',
  //     key:'firstname'
  //   },
  //   {
  //     title:'Last Name',
  //     key:'lastname'
  //   }
  // ]

  // data: Array<any> = [{
  //   "id":'001',
  //   "firstname":"sandip",
  //   "lastname":"gavali"
  // }]
  column=this.columnDataCollection;
  data=this.tabledatacollection;
  submitted:boolean=false;


 
  
  constructor(
    private modalService:BsModalService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder
  ){
   this.getData();
  }


  ngOnInit(): void {
    this.processInputForm = this.fb.group({
      input_digit: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^\d+$/)]]
    });

    this.route.paramMap.subscribe(params => {
      this.reportId = params.get('pagename');
      // Now you can use this.reportId to fetch data or perform other operations
    });

   this.totalRows = this.getArrayLength();
   this.tabledatafun();
   this.tableColumnfunc();

  //  console.log(this.columnDataCollection);
  }
  get f() {
    return this.processInputForm.controls;
  }
  onSubmit(): void {
    debugger;
    if (this.processInputForm.valid) {
      const input_digit = this.processInputForm.get('input_digit')?.value;

      this.apiService.getData(input_digit).subscribe(
        (response: any) => {
          console.log('Request successful', response);
        },
        (error: any) => {
          console.error('Request failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  // onSubmit(): void {
  //   debugger;
  //   this.submitted=true;
  //   if (this.processInputForm.valid) {
      
  //   }
    // if (this.processInputForm.valid) {  // Check form validity before proceeding
    //   var getValue = this.processInputForm.get('input_digit')!.value;
    //   //const formData:any = `input_digit`+ getValue  // Append form control value to FormData

    //   let formData1 = {
    //     'input_digit': getValue
    //   }; 

    //   this.apiService.getData(formData1).subscribe(
    //     response => {
    //       console.log('Request successful', response);
    //     },
    //     error => {
    //       console.error('Request failed', error);
    //     }
    //   );
    // } else {
    //   console.error('Form is invalid');
    // }



    // let formData="";
    // formData.append('input_digit', this.form.get('input_digit')!.value);  // Use non-null assertion operator

    // this.apiService.getData(formData).subscribe(
    //   response => {
    //     console.log('Request successful', response);
    //   },
    //   error => {
    //     console.error('Request failed', error);
    //   }
    // );
  //}

  getData() {
    // this.apiService.getData().subscribe(
    //   response => {
    //     console.log('Data received:', response);
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );
  }
  
  tableColumnfunc(){    
    for (let i = 1; i <= 10000; i++) {
      this.columnDataCollection.push({
        'title':`id ${i}`,
        'key':`firstname ${i}`,
      });
    }
  }
  tabledatafun(){
    let rowCount:any="";
    if(this.reportId==null || this.reportId==undefined || this.reportId==""){
      rowCount=1000;
    }
    else{
      rowCount=1;
    }
    for (let i = 1; i <= rowCount; i++) {
      this.tabledatacollection.push({
        'title':`id ${i}`,
        'firstname':`First Name ${i}`,
      });
    }
  }
  getArrayLength(): number {
    return this.data.length;
  }
  createNewcompoent(){
    const intiDetails={
      title:"add New Page",
      isEdit:false
    }
      let newcomponentRef:BsModalRef= this.modalService.show(CreateDyanamicReportComponentComponent,
      {
        class:'modal-md',
        ignoreBackdropClick:true,
        keyboard:false,
        //initialState:intiDetails
      });

  }
}
