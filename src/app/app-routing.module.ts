import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { 
      path: '', 
      redirectTo: '/home', 
      pathMatch: 'full' },
  {
      path: 'home',
      component: HomeComponent
  },
  {
      path: 'add',
      component: UpdateComponent
  },
  {
      path:'login',
      component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
