import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule, RouterOutlet } from '@angular/router'
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../../modules/shared/footer/footer.component';
import { HeaderComponent } from '../../modules/shared/header/header.component';
import { SideNavComponent } from '../../modules/shared/side-nav/side-nav.component';

const routes:Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[
           {
            path:'reports',
            loadChildren:() => import ('./reports/reports.module').then(m => m.ReportsModule),
            data:{
                title:'Report page'
            }
           },
           {
            path:'dashboard',
            loadChildren:() => import ('./dashboard/dashboard.module').then(m => m.DashboardModule),
            data:{
                title:'Dashboard'
            }
           }
        ]
    }
]

@NgModule({
    declarations:[LayoutComponent,FooterComponent,HeaderComponent,SideNavComponent],   
    imports: [
        CommonModule, 
        RouterOutlet,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[]
})

export class LayoutModule{}