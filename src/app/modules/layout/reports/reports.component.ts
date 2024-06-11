import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CreateDyanamicReportComponentComponent } from '../../layout/create-dyanamic-report-component/create-dyanamic-report-component.component';


import {BsModalRef, BsModalService,ModalOptions } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-login',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
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

  constructor(
    private modalService:BsModalService,
    private route: ActivatedRoute
  ){
   
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.reportId = params.get('pagename');
      // Now you can use this.reportId to fetch data or perform other operations
    });

   this.totalRows = this.getArrayLength();
   this.tabledatafun();
   this.tableColumnfunc();

  //  console.log(this.columnDataCollection);
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
