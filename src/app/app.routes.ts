import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];