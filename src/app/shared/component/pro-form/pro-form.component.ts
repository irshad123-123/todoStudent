import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Ipro } from '../../model/product';
import { NgForm } from '@angular/forms';
import { UuidService } from '../../services/uuid.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-pro-form',
  templateUrl: './pro-form.component.html',
  styleUrls: ['./pro-form.component.scss']
})
export class ProFormComponent implements OnInit {
  isEditMode : boolean = false;
  @ViewChild('formProd') formRef ! : NgForm
  constructor(private _proId : UuidService,
              private _proService : ProductsService
  ) { }

  ngOnInit(): void {
    this.onEdit() 
  }
  editId !: string
  onEdit(){
    this._proService.product$
      .subscribe({
        next : res=>{
          this.formRef.form.patchValue(res)
          this.isEditMode = true
          this.editId = res.productId
        },
        error : err =>{
          console.log(err);
        }
      })
  }
onAddProd(){
if(this.formRef.valid){
    let obj={
    ...this.formRef.value,
    productId : this._proId.Uuid()
  }
  console.log(obj);
  this._proService.addPro(obj)
  this.formRef.reset()
}
}
onUpdate(){
if(this.formRef.valid){
    let updated_obj = {
    ...this.formRef.value,
    productId : this.editId
  }
  console.log(updated_obj);
  this.formRef.reset()
  this.isEditMode = false
  this._proService.updatePro(updated_obj)
}
}
}
