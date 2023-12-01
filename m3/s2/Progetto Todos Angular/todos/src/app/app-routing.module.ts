import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { CompletatiComponent } from './pages/completati/completati.component';

const routes: Routes = [
  {
    path:'',
    component:TodoComponent
  },
  {
    path:'completed',
    component:CompletatiComponent
  },
  {
    path:'**',
    redirectTo:""
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
