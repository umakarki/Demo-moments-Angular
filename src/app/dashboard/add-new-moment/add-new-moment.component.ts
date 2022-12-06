import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpHeaders } from "@angular/common/http";
import { AlertService } from 'src/app/services/alert.service';



// export interface tag {
//   name: string;
// }

@Component({
  selector: 'app-add-new-moment',
  templateUrl: './add-new-moment.component.html',
  styleUrls: ['./add-new-moment.component.css']
})
export class AddNewMomentComponent implements OnInit {

  // momentForm: FormGroup;
  selectedFiles?: File;
  SERVER_URL = "http://localhost:3000/add";
  private uploadSub: Subscription;
  uploadProgress: number = 0;


  momentForm=new FormGroup({
    title:new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
    Tag:new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
  })
  
get title(){
return this.momentForm.get('title');
}
get Tag(){
  return this.momentForm.get('Tag');
  }
  constructor( private formBuilder: FormBuilder, 
    private http:HttpClient,
    private router:Router,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute,
    private alert:AlertService
    ) { }

  ngOnInit(): void {

  }
  selectFiles(event:any){

this.selectedFiles=event.target.files?.[0]

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  // tags: tag[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(event)
    console.log(value)

    // Add our tags
    if (value) {
      this.tags.push(value);
      // this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // remove(tag: tag): void {
    remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    console.log(index)

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addMoment() {
    const formData = new FormData();
    if (this.selectedFiles)
    formData.append("image", this.selectedFiles);
    formData.append("title", this.momentForm.value.title);
    formData.append("tags", this.tags.join(","));
   
    // formData.append("tags", this.momentForm.value.Tag);
    formData.append("createdBy", localStorage.getItem("emailId") || '');
    formData.append("userId", localStorage.getItem("userId") || '');

    const upload$ = this.http.post(this.SERVER_URL, formData, {
    
      reportProgress: true,
      observe: 'events'
      
    })
    


    .pipe(
    
      finalize(() => {
     this.alert.openSnackBar('Sucessfully Added!!','success-snackbar')
      })
      
    );

    this.uploadSub = upload$.subscribe((event: any) => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
        this.router.navigate(['/dashboard/momentList'])
        this.resetForm()
    })
    
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    // this.uploadEditSub.unsubscribe();
    this.uploadProgress = 0;
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }

  resetForm() {
    this.uploadProgress = 0;
    // this.uploadSub.unsubscribe();
  }
 

}
