import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { UserModel } from '../components/models/user.model';
import { CredentialsModel } from '../components/models/credentials.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAdmin: boolean = false;
  public isLoggedIn: boolean = false;

  public userFirstName: string;
  
  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
   }

  public async register(user: UserModel) {
    const addedUser = await this.http.post<UserModel>(environment.registerUrl, user).toPromise();
    return addedUser;
}

public async login(credentials: CredentialsModel) {
    const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();   
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    return loggedInUser;
}


public logout(){
  localStorage.removeItem("user");
}

public getUser() {
  const token = localStorage.getItem("user");
  if (token) {
    const decodedData = jwtDecode(token);
    const user = (decodedData as any).user;
    return user;
  }

}

}