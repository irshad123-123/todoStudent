import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Ipro } from '../../model/product';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-pro-table',
  templateUrl: './pro-table.component.html',
  styleUrls: ['./pro-table.component.scss']
})
export class ProTableComponent implements OnInit {
  proArr : Array<Ipro> = []
  constructor(private _proService : ProductsService) { }

  ngOnInit(): void {
    this._proService.getAllPro()
      .subscribe({
        next : res=>{
          this.proArr = res
          // console.log(res);
        },
        error : err=>{
          console.log(err);
        }
      })
      this._proService.editProId$ 
        .subscribe({
          next : res=>{
            if(res){
              this.editId = ''
            }
          },
          error : err =>{
            console.log(err)
            
          }
        })
  }
onRemove(id:string){
  let isConfirm = confirm('Are you sure, want to remove this product!!')
  if(isConfirm){
      this._proService.removePro(id)
  }
}
editId ! : string | boolean
onEdit(obj : Ipro){
  this._proService.product$.next(obj)
  this.editId = obj.productId
}

}
