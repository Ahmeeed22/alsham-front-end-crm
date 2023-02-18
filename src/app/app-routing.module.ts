import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { UnauthGuard } from './auth/guards/unauth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';

const routes: Routes = [
  {
    path : '',
    redirectTo:'/login',
    pathMatch : 'full'
  },
  {
    path :'main',
    component : LayoutComponent,
    children : [ {
      path : '',
      loadChildren : ()=>import("./dashboard/dashboard.module").then(m => m.DashboardModule),
      canActivate :[AuthGuard]
    }]
  },
  {
    path:'login',
    loadChildren : ()=>
          import("./auth/auth.module").then(m=>m.AuthModule),
          canActivate :[UnauthGuard]      
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
