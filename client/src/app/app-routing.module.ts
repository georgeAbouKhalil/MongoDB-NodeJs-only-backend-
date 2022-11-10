import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [

  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "home", component: HomeComponent},
  {path: "welcome", component: WelcomeComponent},


  // default route
  /* first method */ {path: "", component: HomeComponent},
  /* second method */ {path: "", redirectTo:"/home", pathMatch: "full"},  // pathMatch: "full" means that the path should be the full path

 
  { path: "**", component: PageNotFoundComponent } // ** means that any other path will be redirected to the home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
