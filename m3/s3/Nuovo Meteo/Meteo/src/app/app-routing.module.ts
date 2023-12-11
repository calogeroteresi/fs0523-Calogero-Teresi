import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Pages/auth/auth.guard';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'

  },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./Pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
 },
 {path:'**',
  redirectTo: '/home',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
