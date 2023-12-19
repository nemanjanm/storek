import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VestiComponent } from './vesti/components/vesti/vesti.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { LigeComponent } from './lige/components/lige/lige.component';
import { TimoviComponent } from './timovi/components/timovi/timovi.component';

const routes: Routes = [
  {
    path:"",
    component: LayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "pocetna"
      },
      {
        path:"pocetna",
        component: VestiComponent
      },
      {
        path:"lige",
        component: LigeComponent
      },
      {
        path:"timovi",
        component: TimoviComponent
      }
    ]
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"logout",
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
