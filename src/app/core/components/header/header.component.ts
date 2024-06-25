import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isNavbarVisible = true;
  _navbarService = inject(NavbarService);
  destroyRef = inject(DestroyRef);
  router = inject(Router)
  ngOnInit(): void {
    this.controlNavbarVisibility();
  }

  controlNavbarVisibility(){
    this._navbarService.isNavbarVisible
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isNavbarVisible: boolean) => {
        this.isNavbarVisible = isNavbarVisible;
      });
  }

  logout(){
    this.router.navigate(['']);
  }

  goToTasks(){
    this.router.navigate(['/todos']);
  }
}
