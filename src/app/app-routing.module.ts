import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewMomentComponent } from './dashboard/add-new-moment/add-new-moment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentListComponent } from './dashboard/moment-list/moment-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateMomentComponent } from './update-moment/update-moment.component';

const routes: Routes = [
  {path:'' ,redirectTo:'signIn', pathMatch:'full'},
  
  {path:"dashboard",component:DashboardComponent,
  children:[
    {path:"momentList",component:MomentListComponent},
    {path:"addNewMoment",component:AddNewMomentComponent},
    {path:"updateMoment/:id", component:UpdateMomentComponent}
  ]},
  {path:"signUp",component:SignUpComponent},
  {path:"signIn",component:SignInComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
