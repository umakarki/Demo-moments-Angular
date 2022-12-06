import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // http://localhost:3000/get?orderBy=id&orderByValue=desc&offset=0&limit=20
  constructor(private http:HttpClient) { }

  postForm(data:any){
    return this.http.post("http://localhost:3000/signUp",data)
  }
  login(data:any){
    return this.http.post(" http://localhost:3000/login",data)
  }
  getMoments(input: any) {
    return this.http.get('http://localhost:3000/get?orderBy=id&orderByValue=desc&offset=0&limit=20', input).pipe();
}

deleteMoment(id: any) {
  //  return this.http.delete("http://localhost:3000/deledfdfte/1333/"+id, {}).pipe();
  return this.http.delete(`http://localhost:3000/delete/${id}`, {}).pipe();
}
getMomentById(id: number) {
  return this.http.get(`http://localhost:3000/getMomentById/${id}`, {}).pipe();
}
}
