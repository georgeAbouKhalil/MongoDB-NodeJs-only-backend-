import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent {
  public user: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
