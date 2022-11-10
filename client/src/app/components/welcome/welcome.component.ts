import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public user: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
