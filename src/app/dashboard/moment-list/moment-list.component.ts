import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component,ViewChild, OnInit} from '@angular/core';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
// import { ServiceService } from 'src/app/service.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';




export interface MomentData {
  id: string;
  image: string;
  title: string;
  tags: string;
}


@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})


export class MomentListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'image', 'title', 'tags', 'action'];
  dataSource: MatTableDataSource<MomentData>;
  isLoadingResults = true;
  totalRecordCount =0;

  searchKey:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

  
    const input = {
      orderBy: 'id',
      orderByValue: 'desc',
      offset: 0,
      limit: 20
      //searchValue:1
    }
    // this.getMomentsData(input)
    this.getMomentsData(input)

   
    
  }

   constructor(private _liveAnnouncer: LiveAnnouncer,
    private api:ApiServiceService,
    private http:HttpClient,
    private router:Router,
    private alert:AlertService)
     { 
    this.dataSource = new MatTableDataSource();
    this.session();
   }

  

  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onclear(){
    this.searchKey="";
    this.applyFilter();
   }
  
   getMomentsData(input: any) {
    this.isLoadingResults = true;
    


    this.api.getMoments(input).subscribe((data: any) => {
      this.isLoadingResults = false;
      if(data.success){
        this.dataSource = new MatTableDataSource<MomentData>(data.getData)
        this.totalRecordCount = data.totalCount;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('view Data')
      } else {
        this.dataSource = new MatTableDataSource();
      }
    }, (_error:any) => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource();
    });
  }



  deleteMnt(id:any){
   

    this.isLoadingResults = true;
    if (confirm("Do you want to save changes?") == true) {
      
    this.api.deleteMoment(id).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        // alert('sucess')
        this.alert.openSnackBar(data.message, 'success-snackbar')
        console.log(data.message)
        this.paginator.pageIndex = 0 // to reset pagination from 1-5 of (Total_count)
        const input = {
          orderBy: 'id',
          orderByValue: 'desc',
          offset: 0,
          limit: 20
          //searchValue:1
          
        }
        this.getMomentsData(input)
         
      }

    })
  }
    else{
      this.alert.openSnackBar('Request cancelled...', 'warn-snackbar')
      console.log('else part')
    }
 
  (_error: any) => {
      alert('somthing went wrong')
      // this.alert.openSnackBar(error.Message.errorMessage, 'error-snackbar')
    };
}



  





  
  session() {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      this.router.navigate(['dashboard/momentList']);
      console.log(getToken)
    } else {
      this.router.navigate(['/signIn']);
      console.log('else')
    }
    
  }
}