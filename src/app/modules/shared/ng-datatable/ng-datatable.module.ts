import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        RouterOutlet,
        NgxPaginationModule,
        FormsModule
    ],
    declarations:[],
    exports:[]
})

export class NgDatatableModule{}