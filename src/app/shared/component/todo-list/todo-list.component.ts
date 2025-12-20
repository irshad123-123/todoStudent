import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../model/todo';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoArr : Array<Itodo> = []
  constructor(private _todoService : TodoService,
              private _snackBar : SnackBarService,
              private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this._todoService.getAllTodo()
      .subscribe({
        next : res=>{
          this.todoArr = res
        },
        error : err=> console.log(err)
      })
      this._todoService.editIdFlag$
        .subscribe({
          next:res =>{
            if(res){
              this.todoId = ''
            }
          }
        })
  }

  onRemoveTodo(id : string){
    const matDialog = new MatDialogConfig
    matDialog.width = '400px'
    matDialog.maxWidth = '90%'
    matDialog.disableClose = true
   let matDialogRef = this._matDialog.open(GetConfirmComponent, matDialog)

   matDialogRef.afterClosed()
    .subscribe({
      next : res=>{
        if(res){
          this._todoService.removeTodo(id)
            .subscribe({
              next : res=>{
                this._snackBar.onSnackBar('The todoItem is removed succesfully!!!')
              },
              error : err=>{
                this._snackBar.onSnackBar(err)
              }
            })
        }
      }
    })
    // let isConfirm = confirm('Are you sure, want to remove this todoItem !!!')
    // if(isConfirm){
    //   this._todoService.removeTodo(id)
    //   .subscribe({
    //     next : res=>this._snackBar.onSnackBar('The todoItem is removed successfully!!!'),
    //     error : err => console.log(err)
    //   })
    // }
  }
  todoId !: string
  onEdit(todo:Itodo){
    this._todoService.todo$.next(todo)
    this.todoId = todo.todoId
  }
}
