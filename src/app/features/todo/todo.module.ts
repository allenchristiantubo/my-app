import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TodoRoutingModule } from './todo-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoConfirmationDialogComponent } from './todo-confirmation-dialog/todo-confirmation-dialog.component';

@NgModule({
  declarations: [TodoComponent, TodoDialogComponent, TodoConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    CdkDropList,
    CdkDrag,
    TodoRoutingModule
  ]
})
export class TodoModule { }
