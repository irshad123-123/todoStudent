import { Injectable } from '@angular/core';
import { Itodo } from '../model/todo';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  onLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(this.todoArr))
  }
  constructor() { }
  todoArr : Array<Itodo> =JSON.parse(localStorage.getItem('todo')!) || [
    {
      todoItem : 'HTML',
      todoId : '123'
    },
    {
      todoItem : 'CSS',
      todoId : '124'
    },
    {
      todoItem : 'Javascript',
      todoId : '125'
    }
  ];
  getAllTodo(){
    return of(this.todoArr)
  }
  addTodo(obj : Itodo){
    this.todoArr.unshift(obj)
    this.onLocalStorage()
    return of(obj)
  }

  removeTodo(id : string){
    let getIndex = this.todoArr.findIndex(f=>f.todoId === id)
    this.todoArr.splice(getIndex, 1)
    this.onLocalStorage()
    return of(id)
    
  }

  todo$ : Subject<Itodo> = new Subject()

  onUpdateTodo(obj: Itodo){
    let getIndex = this.todoArr.findIndex(f=>f.todoId === obj.todoId)
    this.todoArr[getIndex] = obj
    this.onLocalStorage()
    return of(obj)
  }

}
