import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/reports.component';
import { Routes, RouterModule, RouterOutlet } from '@angular/router'
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDyanamicReportComponentComponent } from '../create-dyanamic-report-component/create-dyanamic-report-component.component';

const routes:Routes = [
    {
        path:'',
        component:ReportsComponent
    },
    {
        path:':pagename',
        component:ReportsComponent
    }
]

@NgModule({
    declarations:[ReportsComponent],   
    imports: [
        CommonModule, 
        RouterOutlet,
        SharedModule,        
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports:[]
})

export class ReportsModule{}