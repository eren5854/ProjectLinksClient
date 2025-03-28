import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"admin",
        component:LayoutComponent,
        canActivateChild:[() => inject(AuthService).isAuthenticate()],
        children:[
            {
                path:"",
                component: AdminComponent
            },
            {
                path:"category",
                component: AdminCategoryComponent
            }
        ]
    },
    {
        path:"",
        component: HomeComponent
    }
];
