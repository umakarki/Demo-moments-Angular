import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import { throwError } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
 
 constructor(
 private route: Router
 ) {}
 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 // add authorization header with jwt token if available
 let token = localStorage.getItem('token')

 if (token) {
 request = request.clone({ 
 setHeaders: {
 Authorization: `Bearer ${token}`, 
 
 }
 });
 }
 console.log(request)
 return next.handle(request)
 
 .pipe(
 catchError(err => {
 if (err instanceof HttpErrorResponse) {
 console.log(err.status);
 console.log(err.statusText);
 if (err.status === 401) {
 localStorage.clear();
 this.route.navigate(['/signIn']);
 }
 }
 return throwError(err);
 })
 )
 }
}