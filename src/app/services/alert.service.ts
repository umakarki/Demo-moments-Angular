import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message:string, className:string){
    this.snackbar.open(message,'close',{
          duration:5000,
          verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
          horizontalPosition: 'center',
          panelClass: [className]
    })
  }
}
