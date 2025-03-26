import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild('sideMenu') sideMenu: ElementRef | undefined;
  isDarkTheme = false;
  isSideBarOpen = false;

  constructor(
    private renderer: Renderer2,
    private http: HttpService,
    public auth: AuthService,
  ){
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme-variables');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme-variables');
    }
  }

  toggleSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
    const sideMenuElement = this.sideMenu?.nativeElement as HTMLElement;

    if (this.isSideBarOpen) {
      sideMenuElement.style.display = 'block';
    } else {
      sideMenuElement.style.display = 'none';
    }
  }

  logout() {
    localStorage.setItem("token", "");
  }
}
