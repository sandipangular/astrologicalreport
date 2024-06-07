import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgDatatableComponent } from './ng-datatable/ng-datatable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateDyanamicReportComponentComponent } from '../layout/create-dyanamic-report-component/create-dyanamic-report-component.component';



@NgModule({
    declarations:[NgDatatableComponent, CreateDyanamicReportComponentComponent],
    imports:[
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        ModalModule.forRoot(),
    ],
    exports:[NgDatatableComponent],
    providers:[],

})
export class SharedModule {}