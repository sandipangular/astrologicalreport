import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule, RouterOutlet } from '@angular/router'
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

const routes:Routes = [
    {
        path:'',
        component:DashboardComponent
    }
]

@NgModule({
    declarations:[],   
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

export class DashboardModule{}