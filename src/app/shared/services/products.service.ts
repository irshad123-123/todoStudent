import { Injectable } from '@angular/core';
import { Ipro } from '../model/product';
import { products } from '../const/product';
import { Observable, of, Subject } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  arrPro : Array<Ipro> = products

  constructor(private _snackBar : SnackBarService) { }
  product$ : Subject<Ipro>  = new Subject<Ipro>()
  editProId$ : Subject<boolean>  = new Subject<boolean>()
  getAllPro():Observable<Array<Ipro>>{
    return of(this.arrPro)
  }
  addPro(obj:Ipro){
    this._snackBar.onSnackBar('The new product added successfully!!!')
    return this.arrPro.push(obj)

  }
  removePro(id:string){
    let getIndex = this.arrPro.findIndex(f=>f.productId === id)
    this.arrPro.splice(getIndex, 1)
     this._snackBar.onSnackBar('The product removed successfully!!!')
  }
  updatePro(obj : Ipro){
    let getIndex = this.arrPro.findIndex(f=>f.productId === obj.productId)
    this.arrPro[getIndex]= obj
    this._snackBar.onSnackBar('The product is updated successfully!!!')
  }
}
