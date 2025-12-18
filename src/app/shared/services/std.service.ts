import { Injectable } from '@angular/core';
import { Istd } from '../model/std';
import { Observable, of, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class StdService {
  constructor(private _snackBar: SnackBarService) {

   }

  saveToStorage() {
    localStorage.setItem('student', JSON.stringify(this.stdArr))
  }

  stdArr : Array<Istd> = JSON.parse(localStorage.getItem('student')as string) || [
    { id: '1', name: "Amit Sharma", age: 21, course: "BCA", marks: 82 },
        { id: '2', name: "Priya Singh", age: 22, course: "B.Sc", marks: 75 },
        { id: '3', name: "Rahul Verma", age: 20, course: "B.Tech", marks: 88 },
        { id: '4', name: "Neha Patel", age: 23, course: "MBA", marks: 91 },
        { id: '5', name: "Sameer Khan", age: 21, course: "BA", marks: 69 }
  ]

  posts$: Subject<Istd> = new Subject()
  fetchAll():Observable<Istd[]> {
    return of([...this.stdArr])
  }
  addStd(obj: Istd):Observable<Istd> {
    this.stdArr.push(obj)
    this.saveToStorage()
    return of(obj)
  }
  removeObj(obj: Istd) {
    let isConfirm = confirm('Are you sure, do you want to remove this student!!!')
    if (isConfirm) {
      let getIndex = this.stdArr.findIndex(f => f.id === obj.id)
      this.stdArr.splice(getIndex, 1)
      this._snackBar.onSnackBar('The student detail is removed successfully!!!')
      this.saveToStorage()
      // return of(obj)
    }
  }
  updateObj(obj: Istd):Observable<Istd> {
    let getIndex = this.stdArr.findIndex(f => f.id === obj.id)
    this.stdArr[getIndex] = obj
    this.saveToStorage()
    return of(obj)
  }
}
