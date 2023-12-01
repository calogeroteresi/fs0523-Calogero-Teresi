import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActiveComponent } from './pages/active/active.component';
import { InactiveComponent } from './pages/inactive/inactive.component';
import { UsersComponent } from './pages/users/users.component';
import { DetailsComponent } from './pages/details/details.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title:'Home page'
  },
  {
    path:'active',
    component: ActiveComponent,
    title:'Posts attivi'
  },
  {
    path:'inactive',
    component: InactiveComponent,
    title:'Posts inattivi'
  },
  {
    path:'create',
    component: CreateComponent,
    title:'Posts inattivi'
  },
  {
    path:"users",
    component:UsersComponent,
    children:[
      {
        path:":id",
        component:UserDetailsComponent
      }
    ]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Dettagli post'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
