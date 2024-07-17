import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:3000/';
  constructor(private _http: HttpClient) { }

  login(data:any){
    let url = `${this.API_URL}users?username=${data.username}&singular=1`;
    return this._http.get(url);
  }
}
