import { Component } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../apis/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword:boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router: Router,
    private navbarService: NavbarService,
    private userService: UserService
  ){
    this.navbarService.isNavbarVisible.next(false);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  login(){
    if(!this.loginForm.invalid){
      this.userService.login(this.loginForm.value).subscribe({
        next: (user: any) => {
          if(user.password == this.loginForm.value.password){
            this.goToTodoPage();
          }
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 404)
          this.loginForm.controls.username.setErrors({notFound: true})
        }
      })
    }
  }

  goToTodoPage(){
    this.router.navigate(['/todos'])
  }
}
