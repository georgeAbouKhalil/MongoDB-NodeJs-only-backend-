import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private notify: NotifyService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.authService.logout();
      this.notify.success("You are logged out  ");
      // this.router.navigateByUrl("/home");
      window.location.href = "home"


  }

}
