import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ServiceService } from '../service.service';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;


signinForm=new FormGroup({
  emailId:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\\.[a-z]{2,4}$")]),
  password:new FormControl('',[Validators.required,Validators.minLength(6), Validators.maxLength(20),Validators.pattern("^[a-zA-Z.@_0-9]+$")])
})

get email(){
  return this.signinForm.get('emailId')
}
get password(){
  return this.signinForm.get('password')
}

  constructor(private http:HttpClient,private router:Router,private snackBar:MatSnackBar,private api:ApiServiceService) { }

  ngOnInit(): void {
    this.session()
    
  }

  signIn(){
  
    this.api.login(this.signinForm.value)
    .subscribe((res:any)=>{

      console.log(res)
      if(res.success){
        const logSucces="Signin Success!"
        const action="close"
        this.snackBar.open(logSucces,action,{
          duration:5000,
          verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
          horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'

        })
        localStorage.setItem('emailId',res.emailId)
        localStorage.setItem('userId',res.userId)
        localStorage.setItem('token',res.token)
        
        this.router.navigate(['dashboard/momentList'])
        
      }else{
        const logSucces="User Not Found"
        const action="close"
        this.snackBar.open(logSucces,action,{
          duration:5000,
          verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
          horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'

        })
      }
      


 
    },err=>{
      const wentWrong="Something went wrong!!"
      const action="close"
      this.snackBar.open(wentWrong,action,{
        duration:5000,
      });
    })
   
  }


  session() {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      this.router.navigate(['/dashboard/momentList']);
      console.log('if')
    } else {
      this.router.navigate(['/signIn']);
      console.log('else')
    }
    
  }
}
