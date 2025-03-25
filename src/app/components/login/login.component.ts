import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../../models/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();
  isLoading: boolean = false; // Spinner için değişken
  constructor(
    private http: HttpService,
    private router: Router
  ){}

  login(form:NgForm){
    if(form.valid){
      this.isLoading = true; // Spinner başlat
      this.http.post<LoginResponseModel>("Auth/Login", this.loginModel, (res) => {
        console.log(res.token);
        localStorage.setItem("token", res.token!);
        this.router.navigateByUrl("/admin");
      }, () => {
        this.isLoading = false;
      });
    }
  }
}
