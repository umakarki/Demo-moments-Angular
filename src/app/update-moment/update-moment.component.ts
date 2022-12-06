import { Component, OnInit,OnDestroy } from '@angular/core';
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
// import { ServiceService } from '../service.service';
import { ApiServiceService } from '../services/api-service.service';
import { AlertService } from '../services/alert.service';


// export interface tag {
//   name: string;
// }

@Component({
  selector: 'app-update-moment',
  templateUrl: './update-moment.component.html',
  styleUrls: ['./update-moment.component.css']
})
export class UpdateMomentComponent implements OnInit,OnDestroy{
id:any

  selectedFiles?: File;
  SERVER_URL = "http://localhost:3000/add";
  private uploadSub: Subscription;
  uploadEditSub: Subscription;
  upload$:Subscription
  uploadProgress: number = 0;
  tag: string[] = [];
  image: string = '';
  momentId: number = 0

  momentForm=new FormGroup({
    title:new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
    // Tag:new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9 ]+$/)]),
  })
  
get title(){
return this.momentForm.get('title');
}
get Tag(){
  return this.momentForm.get('Tag');
  }
  constructor( private formBuilder: FormBuilder, 
    private http:HttpClient,
    
    private snackBar:MatSnackBar,
    private route:ActivatedRoute,
    private api:ApiServiceService,
    private router:Router,
    private alert:AlertService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getMomentId()
    console.log(this.momentForm.value)
  
  }
  ngOnDestroy() {
    
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

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    console.log(index)

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  getMomentId(){
    this.api.getMomentById(this.id ).subscribe((data: any) => {
      console.log(data)
      // if(data.success){
      //   this.momentForm.setValue({
      //     title: data.data.title,
      //     Tag:data.data.Tag
      //   })
      //   this.momentId = this.id
        this.tags = data.data.tags.split(",")
        this.momentForm.controls["title"].setValue(data.data.title);
        // this.momentForm.controls["Tag"].setValue(data.data.Tag);
      console.log(this.momentForm.value)
        this.image = data.data.image.path;
      // }
    }, (error) => {
      console.log(error)
    });
  }

  updateMoment() {
    const formData = new FormData();
    if (this.selectedFiles)
      formData.append("image", this.selectedFiles);
    formData.append("title", this.momentForm.value.title);
    formData.append("tags", this.tags.join(","));
   
    // formData.append("tags", this.momentForm.value.Tag);
    formData.append("updatedBy", localStorage.getItem("emailId") || '');
    formData.append("userId", localStorage.getItem("userId") || '');
    console.log(formData)

    const upload$ = this.http.patch(`http://localhost:3000/update/${this.id}`, formData, {
    
      reportProgress: true,
      observe: 'events'
     
    })
    .pipe(
    
      finalize(() => {
this.alert.openSnackBar('Updated Successfully !!','success-snackbar')
       
      })
      
    );
      
    this.uploadEditSub = upload$.subscribe((event: any) => {
      console.log(event)
      if (event.type == HttpEventType.DownloadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
  // this.upload$.unsubscribe()
      this.router.navigate(['dashboard/momentList']);
   
        // this.router.navigate(['dashboard'], { relativeTo: this.route });
   ;
        
    })

    
  }


  cancelUpload() {
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadEditSub.unsubscribe();
  }
  resetForm() {
    this.uploadProgress = 0;
    // this.uploadEditSub.unsubscribe()
  }
 

}

