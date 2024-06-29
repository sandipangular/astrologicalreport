import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CreateDyanamicReportComponentComponent } from '../../layout/create-dyanamic-report-component/create-dyanamic-report-component.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../services/ApiService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inputdigit } from '../../../core/interface/sideNavMenu';

@Component({
  selector: 'app-login',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  @ViewChild('inputDigit') inputDigit?: ElementRef;
  processInputForm!: FormGroup;

  reportId: string | null = null;
  title = 'smartreport';
  totalRows: number = 0;
  tabledatacollection: Array<any> = [];
  columnDataCollection: Array<any> = [];
  inputValueArray:Array<any>=[];

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
  column = this.columnDataCollection;
  data = this.tabledatacollection;
  submitted: boolean = false;
  inputValue=this.inputValueArray;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.processInputForm = this.fb.group({
      input_digit: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });

    this.route.paramMap.subscribe((params) => {
      this.reportId = params.get('pagename');
    });

    this.totalRows = this.getArrayLength();

    //  console.log(this.columnDataCollection);
  }
  get f() {
    return this.processInputForm.controls;
  }
  onSubmit(): void {
    if (this.processInputForm.valid) {
      const input_digit = this.processInputForm.get('input_digit')?.value;
      const url = `http://ec2-43-205-13-35.ap-south-1.compute.amazonaws.com:8686/process-input?input_digit=${input_digit}`;

      const headers = new HttpHeaders({
        Authorization: 'sr-asdfghjksdfghjkwertyuiozxcvbndfgh',
        'Content-Type': 'application/json',
      });
      this.http.post(url, null, { headers }).subscribe(
        (res: any) => {
          console.log('API result', res);
          this.tabledatafun(res);
          this.tableColumnfunc(res);
          this.inputValuefunction(input_digit)
          this.processInputForm.get('input_digit')?.reset();
        },
        (error) => {
          console.error('API call error', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  inputValuefunction(input_digit:any){
    this.inputValueArray.push(input_digit);
  }

  tableColumnfunc(res:any){
    let resArray = res.all_results;
    let flattenedArray = resArray.reduce(
      (acc: any[], val: any[]) => acc.concat(val),
      []
    );
    for (let i = 0; i < flattenedArray.length; i++) {
      this.columnDataCollection.push({
        title: `${i + 1}`,
        key: flattenedArray[i],
      });

      // Add the first extra column
      this.columnDataCollection.push({
        title: `${i + 1}`,
        key: 'code1', // Adjust key as needed
      });

      // Add the second extra column
      this.columnDataCollection.push({
        title: `${i + 1}`,
        key: 'code2', // Adjust key as needed
      });
    }
  }


  tabledatafun(res:any){
    var getSingleArray:Array<any>=[];
    let resArray = res.all_results;
    let flattenedArray = resArray.reduce(
      (acc: any[], val: any[]) => acc.concat(val),
      []
    );   
    
    for (let i = 0; i < flattenedArray.length; i++) {
      getSingleArray.push({
        title: `id ${i + 1}`,
        key:flattenedArray[i]
      });
      getSingleArray.push({
        title: `id ${i + 2}`,
        key:''
      });
      getSingleArray.push({
        title: `id ${i + 3}`,
        key:''
      });
    }
    let flattenedArray1 = getSingleArray.reduce(
      (acc: any[], val: any[]) => acc.concat(val),
      []
    );  
    // console.log("data signle Array", flattenedArray1);
    this.tabledatacollection.push(flattenedArray1);
  }

  getArrayLength(): number {   
    return this.data.length;
  }
  createNewcompoent() {
    const intiDetails = {
      title: 'add New Page',
      isEdit: false,
    };
    let newcomponentRef: BsModalRef = this.modalService.show(
      CreateDyanamicReportComponentComponent,
      {
        class: 'modal-md',
        ignoreBackdropClick: true,
        keyboard: false,
        //initialState:intiDetails
      }
    );
  }
}
