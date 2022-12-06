import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { MomentListComponent } from './moment-list/moment-list.component';
import { AddNewMomentComponent } from './add-new-moment/add-new-moment.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
    MomentListComponent,
    AddNewMomentComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    
   
    
  ],
  exports: [
    DashboardComponent,
    MomentListComponent,
    AddNewMomentComponent,
   
  ]
})
export class DashboardModule { }
