import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { StudentModule } from '../student/student.module';


@NgModule({
  declarations: [SidebarComponent, HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    StudentModule
  ]
})
export class LayoutModule { }
