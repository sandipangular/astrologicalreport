import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule, RouterOutlet } from '@angular/router'
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../../modules/shared/footer/footer.component';
import { HeaderComponent } from '../../modules/shared/header/header.component';
import { SideNavComponent } from '../../modules/shared/side-nav/side-nav.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

const routes:Routes = [
    {
        path:'',
        component:LayoutComponent,
        data: { breadcrumb: 'Dashboard' },
        children:[
           {
            path:'reports',
            loadChildren:() => import ('./reports/reports.module').then(m => m.ReportsModule),
            data:{
                title:'Report page',
                breadcrumb: 'Reports'
            }
           },
           {
            path:'dashboard',
            loadChildren:() => import ('./dashboard/dashboard.module').then(m => m.DashboardModule),
            data:{
                title:'Dashboard',
                data: { breadcrumb: 'Dynamic Report' }
            }
           }
        ]
    }
]

@NgModule({
    declarations:[
        LayoutComponent,
        FooterComponent,
        HeaderComponent,
        SideNavComponent,
        BreadcrumbComponent
    ],   
    imports: [
        CommonModule, 
        RouterOutlet,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[],
})

export class LayoutModule{}