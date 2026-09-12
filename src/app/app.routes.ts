import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        data: { hideHeader: true }
    },
    {
        path: 'signup',
        component: Signup,
        data: { hideHeader: true }
    },
    {
        path: 'edit-profile',
        loadComponent: () => import('./edit-profile/edit-profile').then(m => m.EditProfile)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },
    { path: 'applications/new', loadComponent: () => import('./add-new-application/add-new-application').then(m => m.AddNewApplication) },
    { path: 'applications/:id/edit', loadComponent: () => import('./add-new-application/add-new-application').then(m => m.AddNewApplication) }, 
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];