import { Component } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword:boolean = false;

  constructor(private router: Router,
    private navbarService: NavbarService
  ){
    this.navbarService.isNavbarVisible.next(false);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  goToTodoPage(){
    this.router.navigate(['/todos'])
  }
}
