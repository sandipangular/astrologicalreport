import { Routes } from '@angular/router';

export const routes: Routes = [];

routes.push({
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
})
routes.push({
    path:'login',
    loadChildren:()=>import('./modules/auth/login/login.module').then (m=>m.LoginModule)
})
// routes.push({
//     path:'reports',
//     loadChildren:()=>import('./modules/layout/reports/reports.module').then (m=>m.ReportsModule)
// })

routes.push({
    path:'admin',
    loadChildren:() => import('./modules/layout/layout.module').then (m => m.LayoutModule)
})

