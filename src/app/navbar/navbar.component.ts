import { Component } from '@angular/core';
import { CategoriesServiceService } from '../services/categories-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navItems: any = [];
  remainingItems: any = [];
  showDropdownFlag = false;
  flag = false;
  constructor(
    private req: CategoriesServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const userId = this.cookieService.get('userId');
    if (userId) {
      this.flag = true;
    }
    this.req.getAllCategories().subscribe((res: any) => {
      if (res.length > 7) {
        // Take the first 7 items
        this.navItems = res.slice(0, 7);
        this.showDropdownFlag = true;
        // Take the remaining items
        this.remainingItems = res.slice(7);
      } else {
        this.navItems = res;
      }
    });
  }

  logout() {
    this.cookieService.delete('userId');
    window.location.href = '/';
  }

}
