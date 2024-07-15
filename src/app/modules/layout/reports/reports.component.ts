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
  isHeaderLoad: boolean = false;
  column = this.columnDataCollection;
  data = this.tabledatacollection;
  submitted: boolean = false;

  getMatchstatus:Array<any>=[];

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    //this.loadInitialData();
  }

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

   
  }

  // loadInitialData(){
  //   this.http.get<any[]>('../../../../assets/configuration/static.json').subscribe(
  //     data => {
  //       let flattenedArray = data.reduce((acc: any[], val: any[]) => acc.concat(val),[]);
  //       for (let i = 0; i < flattenedArray.length; i++) {
  //         this.columnDataCollection.push({
  //           title: `${i + 1}`,
  //           key: flattenedArray[i],
  //         });
    
  //         // Add the first extra column
  //         this.columnDataCollection.push({
  //           title: `${i + 1}`,
  //           key: 'code1', // Adjust key as needed
  //         });
    
  //         // Add the second extra column
  //         this.columnDataCollection.push({
  //           title: `${i + 1}`,
  //           key: 'code2', // Adjust key as needed
  //         });
  //       }

  //     //  this.loadInitRowData(data)
        
  //     },
  //     error => {
  //       console.error('Error loading JSON data', error);
  //     }
  //   );
  // }

  // loadInitRowData(data:any){
  //   var getSingleArray:Array<any>=[];
  //   let flattenedArray = data.reduce((acc: any[], val: any[]) => acc.concat(val),[]);
  //   for (let i = 0; i < flattenedArray.length; i++) {
  //     getSingleArray.push({
  //       title: `id ${i + 1}`,
  //       key:flattenedArray[i]
  //     });
  //     getSingleArray.push({
  //       title: `id ${i + 2}`,
  //       key:''
  //     });
  //     getSingleArray.push({
  //       title: `id ${i + 3}`,
  //       key:''
  //     });
  //   }
  //   let flattenedArray1 = getSingleArray.reduce((acc: any[], val: any[]) => acc.concat(val),[]);  
  //   // console.log("data signle Array", flattenedArray1);
  //   this.tabledatacollection.push(flattenedArray1);
  // }


  get f() {
    return this.processInputForm.controls;
  }
  onSubmit(): void {
    if (this.processInputForm.valid) {
      let input_digit:any;
      if (this.processInputForm.get('input_digit')?.value.includes('00')) {
        alert('Input should not contain "00". Please enter a valid value.');
      } else {
        input_digit = this.processInputForm.get('input_digit')?.value;
      }
      const url = `http://ec2-43-205-13-35.ap-south-1.compute.amazonaws.com:8686/process-input?input_digit=${input_digit}`;

      const headers = new HttpHeaders({
        Authorization: 'sr-asdfghjksdfghjkwertyuiozxcvbndfgh',
        'Content-Type': 'application/json',
      });
      this.http.post(url, null, { headers }).subscribe(
        (res: any) => {
         // console.log('API result', res);
         if (!this.isHeaderLoad) {
          this.tableColumnfunc(res);  
          this.isHeaderLoad = true;
      }     
          this.tabledatafun(res);
          this.inputValuefunction(input_digit);
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
    //console.log("this.inputValueArray",this.inputValueArray)
  }

  tableColumnfunc(res:any){
    let resArray = res.all_results;
    let flattenedArray = resArray.reduce((acc: any[], val: any[]) => acc.concat(val),[]);
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

  

  tabledatafun(res: any) {
    let getSingleArray: Array<any> = [];
    let resArray = res.all_results;
    let flattenedArray = resArray.reduce((acc: any[], val: any[]) => acc.concat(val), []);

    //debugger;
    for (let i = 0; i < flattenedArray.length; i++) {
      getSingleArray.push({
        title: `id ${i + 1}`,
        key: flattenedArray[i]
      });
       // Add the first extra column
       getSingleArray.push({
        title: `id ${i + 2}`,
        key: '', // Adjust key as needed
      });

      // Add the second extra column
      getSingleArray.push({
        title: `id ${i + 3}`,
        key: '', // Adjust key as needed
      });
    }
  
    let flattenedArray1 = getSingleArray.reduce((acc: any[], val: any[]) => acc.concat(val), []);

    this.tabledatacollection.push(flattenedArray1);
    this.updateTableData(this.tabledatacollection);


  }
  updateTableData(data: any[]) {
    const input_digit = this.processInputForm.get('input_digit')?.value;
    const inputDigits = input_digit.toString().split('');
    
    for (let i = 0; i < data.length; i++) {
      let currentIndex: any = data.length - 1;
      let previousRowIndex: any = data.length - 2;
      let currentRow = data[currentIndex];
      let previousRow = data[previousRowIndex];
      let formattedRow: Array<any> = [];
     
      for (let j = 0; j < currentRow.length; j++) {   
        let previousKeyDigits = previousRow[j].key.toString().split('');
        let matchElement = currentRow[j].key.toString().split('');
        
        let previousMatch = matchElement.some((digit: any) => previousKeyDigits.includes(digit));
        debugger;
        if(previousMatch){
          if(previousRow[j].key==""){
            let previousKeyDigits = previousRow[j - 1].key.toString().split('');
            let matchElement = currentRow[j - 1].key.toString().split('');
            
            let columnMatch = matchElement.some((digit: any) => previousKeyDigits.includes(digit));
            if(columnMatch){
              formattedRow.push({
                title: `id ${j + 1}`,
                key: `Yes`,
              }); 
            }
            else{
              formattedRow.push({
                title: `id ${j + 1}`,
                key: `No`,
              });
            }
          }
          else{
            formattedRow.push({
              title: `id ${j + 1}`,
              key: `${previousRow[j].key}`,
            });
          }
        }
        else{
          if(previousRow[j].key==""){
            let previousKeyDigits = previousRow[j - 1].key.toString().split('');
            let matchElement = currentRow[j - 1].key.toString().split('');
            
            let columnMatch = matchElement.some((digit: any) => previousKeyDigits.includes(digit));
            
            if(columnMatch){
              formattedRow.push({
                title: `id ${j + 1}`,
                key: `Yes`,
              }); 
            }
            else{
              formattedRow.push({
                title: `id ${j + 1}`,
                key: `No`,
              });
            }
          }
          else{
            formattedRow.push({
              title: `id ${j + 1}`,
              key: `${previousRow[j].key}`,
            });
          }
        }       
      }
    
      data[previousRowIndex] = formattedRow;
    }
    
    this.tabledatacollection = data; // Assign the updated data back to tabledatacollection
  }
  
  







//   updateTableData(data: any[]) {
//     const input_digit = this.processInputForm.get('input_digit')?.value;
//     const inputDigits = input_digit.toString().split('');

//     for (let i = 1; i < data.length; i++) {
//       if(data.length>0){      
//         debugger;
//         var getcurrentIndex = data.length - 1;
//         if(getcurrentIndex==1){
//           this.tabledatacollection =data;
//         }
//         else{
//           let currentRow = data[getcurrentIndex];

//           let previousRowIndex = data.length - 2;
//           let previousRow:any = data[previousRowIndex];
  
//           let formattedRow = [];
  
//           for (let j = 0; j < currentRow.length; j++) {
//               let matchElement = currentRow[j].key.toString().split('');
//               let previousMatch = matchElement.some((item: any) => inputDigits.includes(item));
//               debugger;
//               if (previousMatch) {
//                   formattedRow.push({
//                       title: `id ${j + 1}`,
//                       key: `${previousRow[j].key}  - Yes`
//                   });
//               } else {
//                   formattedRow.push({
//                       title: `id ${j + 1}`,
//                       key: `${previousRow[j].key}  - No`
//                   });
//               }
//           }
//           data[i] = formattedRow;
//           console.log("data[i]0" ,data[i])
//         }       
//       }
//       else{
//         debugger;
//        // this.tabledatacollection =data;
//       }
        
//     }

//     // Assign the updated data back to tabledatacollection
    
//      this.tabledatacollection =data; // Ensure immutability
//     // console.log("Updated data", this.tabledatacollection);
// }




  
  


  // updateTableData(data: any[]) {
  //   const input_digit = this.processInputForm.get('input_digit')?.value;
  //   if (!input_digit) {
  //     return;
  //   }  
  //   const inputDigits = input_digit.toString().split('');  
  //   let mainArrayToPass: any[] = [];   
  
  //   data.forEach((currentRow, currentIndex) => {
  //    debugger;
     
  //     if (currentIndex > 0) {        
        
  //       const previousRow = data[currentIndex - 1];
  //       let newPreviousArray: any[] = [];  
  
  //       for (let j = 0; j < previousRow.length; j++) {
  //         let matchElement = previousRow[j].key.toString().split('');
  //         let previousMatch = matchElement.some((item: any) => inputDigits.includes(item)); 

  //         if (previousMatch) {
  //           newPreviousArray.push({
  //             title: `id ${j + 1}`,
  //             key: `${previousRow[j].key} - Yes`
  //           });
  //         } 
  //         else {
  //           newPreviousArray.push({
  //             title: `id ${j + 1}`,
  //             key: `${previousRow[j].key} - No`
  //           });
  //         }
  //       } 
  //      mainArrayToPass[currentIndex] = newPreviousArray;
  //     } else {
  //      mainArrayToPass[currentIndex] = currentRow[currentIndex];
  //     }
  //     console.log("aftercompleting array", mainArrayToPass); 
      
  //   });
   
   
  //   // console.log("aftercompleting array", mainArrayToPass); 
  
  //   // Update the tabledatacollection with the new data
  //  // this.tabledatacollection=mainArrayToPass;
  //  /// console.log("this.data this.data" , this.tabledatacollection)
    
  // }







  // updateTableData(data: any[]) {
  //   const input_digit = this.processInputForm.get('input_digit')?.value;
  //   if (!input_digit) {
  //     return;
  //   }  
  //   const inputDigits = input_digit.toString().split('');  
  //   let mainArrayToPass: any[] = [];
  
  //   data.forEach((currentRow, currentIndex) => {
  //     if (currentIndex > 0) {        
  //       const previousRow = data[currentIndex - 1];
  //       let newPreviousArray: any[] = [];  
  
  //       for (let j = 0; j < previousRow.length; j++) {
  //         let matchElement = previousRow[j].key.toString().split('');
  //         let previousMatch = matchElement.some((item: any) => inputDigits.includes(item)); 

  //         if (previousMatch) {
  //           newPreviousArray.push({
  //             title: `id ${j + 1}`,
  //             key: `${previousRow[j].key} - Yes`
  //           });
  //         } else {
  //           newPreviousArray.push({
  //             title: `id ${j + 2}`,
  //             key: `${previousRow[j].key} - No`
  //           });
  //         }
  //       }
  //      // console.log("aftercompleting array", newPreviousArray);  
  //      mainArrayToPass[currentIndex] = newPreviousArray;
  //     } else {
  //      mainArrayToPass[currentIndex] = data[currentIndex];
  //     }
  //   });

  //   console.log("aftercompleting array", mainArrayToPass); 
  
  //   // Update the tabledatacollection with the new data
  // //  this.tabledatacollection=mainArrayToPass;
  //  /// console.log("this.data this.data" , this.tabledatacollection)
    
  // }
  

  
  // updateTableData(data: any[]) {
  //   const input_digit = this.processInputForm.get('input_digit')?.value;
  //   if (!input_digit) {
  //     return;
  //   }
  
  //   const inputDigits = input_digit.toString().split('');
  
  //   data.forEach((currentRow, currentIndex) => {
  //     if (currentIndex > 0) {
  //       const previousRow = data[currentIndex - 1];
  //       let setFormattedArray: any[] = [];
  
  //       for (let j = 0; j < previousRow.length; j++) {
  //         let matchElement = previousRow[j].key.toString().split('');
  //         let previousMatch = matchElement.some((item: any) => inputDigits.includes(item));
  
  //         if (previousMatch) {
  //           setFormattedArray.push({
  //             title: `id ${currentIndex + 1}`,
  //             key: `${previousRow[j].key} - Yes`
  //           });
  //         } else {
  //           setFormattedArray.push({
  //             title: `id ${currentIndex + 1}`,
  //             key: ''
  //           });
  //         }
  //       }
  //       console.log("currentRow", setFormattedArray)
  //       console.log("setFormattedArray", setFormattedArray)
  
  //      // this.tabledatacollection.push(setFormattedArray);
  //     }
  //   });
  // }
  
    
  
  
  
  

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
