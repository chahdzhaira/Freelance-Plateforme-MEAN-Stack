import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://127.0.0.1:4200/users/"

  constructor(private http : HttpClient) {}

  register(user : any){
    return this.http.post ( this.url +'register' , user );
  }

  login(user : any){
    return this.http.post ( this.url + 'login' , user);
  }

  getUserById(id : any){
    return this.http.get ( this.url + id) ;
  }

  editUser (id : any , userData : any ){
    return this.http.put (this.url + id , userData) ;
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token){
      return true ;
    }else{
      return false ;
    }
  }

  getUserIdFromToken(){
    let token = localStorage.getItem('token');
    if(token){
      return JSON.parse(window.atob(token.split('.')[1])).id ;
    }
  }

}
