import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  /**
   * Description: This function will call the API to login a user
   */
  signin(username: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      username,
      password
    })
  }

  /**
   * Description: This function will call the register user api
   */
  register(user: User): Observable<any> {
    return this.http.post('/api/session/register', {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    })
  }


  // verify username
  verifyusername(username: string): Observable<any>{
    return this.http.get('/api/session/verify/users/' + username);
  }

}
