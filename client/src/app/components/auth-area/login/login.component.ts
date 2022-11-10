import { CredentialsModel } from './../../models/credentials.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public credentials = new CredentialsModel();
  constructor(private authService: AuthService, private router: Router, private notify: NotifyService,) { }

  public async login(): Promise<void> {
    try {
      await this.authService.login(this.credentials);
      this.notify.success("You are logged-in");
      window.location.href = "welcome"
    }
    catch(err: any) {
      this.notify.error(err);

    }
  }


}
