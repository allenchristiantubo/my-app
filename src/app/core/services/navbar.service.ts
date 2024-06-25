import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isNavbarVisible = new BehaviorSubject<boolean>(true);
  isDrawerOpen = new BehaviorSubject<boolean>(false);
  constructor() { }

  toggleDrawer(){
    this.isDrawerOpen.next(!this.isDrawerOpen.value);
  }
}
