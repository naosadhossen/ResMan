import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UpdateComponent } from './update/update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'navigation',
        component: NavigationComponent
    },
    {
        path: 'update',
        component: UpdateComponent
    },
    {
        path:'login',
        component: LoginComponent
    }
];
