import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NgForm } from '@angular/forms';
import { UuidService } from '../../services/uuid.service';
import { Itodo } from '../../model/todo';
import { SnackBarService } from '../../services/snack-bar.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @ViewChild('formRef') formRef !: NgForm
  isEditMode: boolean = false;
  constructor(private _todoService: TodoService,
    private _uuidService: UuidService,
    private _snackBar: SnackBarService
  ) { }
  editId !: string
  ngOnInit(): void {
    this._todoService.todo$
      .subscribe({
        next: res => {
          this.editId = res.todoId
          this.formRef.form.patchValue(res)
          this.isEditMode = true
        },
        error: err => console.log(err)
      })
  }
  onAddTodo() {
    if (this.formRef.valid) {
      let obj: Itodo = {
        ...this.formRef.value,
        todoId: this._uuidService.Uuid()
      }
      this.formRef.reset()
      // console.log(obj);
      this._todoService.addTodo(obj)
        .subscribe({
          next: res => this._snackBar.onSnackBar('The new todoItem is added successfully!!!'),
          error: err => console.log(err)
        })
    }
  }


  onUpdateTodo() {
    if (this.formRef.valid) {
      let updated_obj: Itodo = {
        ...this.formRef.value,
        todoId: this.editId
      }
      this._todoService.onUpdateTodo(updated_obj)
      .subscribe({
        next: res=>{
          this.formRef.reset()
      this.isEditMode = false;
      this._snackBar.onSnackBar('The todoItem is updated successfully!!!')
      this._todoService.editIdFlag$.next(true)
        },
        error : err => console.log(err)
      })
    }
  }
}
