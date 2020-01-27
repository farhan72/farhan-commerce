import { AuthGuard } from './../../shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {StudenListComponent} from '../student/studen-list/studen-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'student-list', component: StudenListComponent}
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
