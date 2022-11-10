import { AuthService } from './../../../services/auth.service';
import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public user = new UserModel();
  constructor(private notify: NotifyService,private authService: AuthService, private router: Router) { }

  public async register(): Promise<void> {
    try {
      await this.authService.register(this.user);
      // alert("You are registered");
      this.notify.success("You are registered 😊 ");
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      // alert(err.message);
      this.notify.error(err);
    }
  }

}
