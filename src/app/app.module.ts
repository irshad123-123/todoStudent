import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StdFormComponent } from './shared/component/std-form/std-form.component';
import { StdTableComponent } from './shared/component/std-table/std-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TodoListComponent } from './shared/component/todo-list/todo-list.component';
import { TodoFormComponent } from './shared/component/todo-form/todo-form.component';
import { TodoPipe } from './shared/pipes/todo.pipe';
import { StudentFilter } from './shared/pipes/student.pipe';
import { ProFormComponent } from './shared/component/pro-form/pro-form.component';
import { ProTableComponent } from './shared/component/pro-table/pro-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    StdFormComponent,
    StdTableComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoPipe,
    StudentFilter,
    ProFormComponent,
    ProTableComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
