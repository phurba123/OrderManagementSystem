import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUri = "http://localhost:3000/api/v1/user"

  constructor(private http:HttpClient) { }

  // service for signup
  public signup(data):Observable<any>
  {
    let params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
    .set('username',data.username)
    .set('mobile',data.mobile)

    return this.http.post(`${this.baseUri}/signup`,params);
  }

  // sign in 
  public signIn(email,password):Observable<any>
  {
    let params = new HttpParams()
    .set('email',email)
    .set('password',password)

    return this.http.post(`${this.baseUri}/signin`,params);
  }

  // sign out
  public signOut(authToken):Observable<any>
  {
    return this.http.post(`${this.baseUri}/signout?authToken=${authToken}`,{});
  }

  // reset password
  public resetPassword(email):Observable<any>
  {
    let params = new HttpParams()
    .set('email',email);

    return this.http.post(`${this.baseUri}/reset/password`,params);
  }
}
