import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './logincomponent';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
    {
        path:'',
        component:LoginComponent
    }
]

@NgModule({
    declarations:[LoginComponent],   
    imports: [
        CommonModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports:[]
})

export class LoginModule{}