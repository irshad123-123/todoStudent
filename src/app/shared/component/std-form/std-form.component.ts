import { NgForOfContext } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StdService } from '../../services/std.service';
import { UuidService } from '../../services/uuid.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  isEditMode: boolean = false;
  @ViewChild('formRef') formCont ! : NgForm
  constructor(private _stdService : StdService,
              private _uuidService : UuidService,
              private _snackBar : SnackBarService
              
  ) { }

  ngOnInit(): void {
    this.onEdit()
  }
  editId! : string
  onEdit(){
        this._stdService.posts$
      .subscribe({
        next : res => {
          this.editId = res.id
          this.formCont.form.patchValue(res)
          this.isEditMode=true
        },
        error : err=> console.log(err)
      })
  }
  onAddForm(){
    if(this.formCont.valid){
      let obj={
      ...this.formCont.value,
      id : this._uuidService.Uuid()
    }
    console.log(obj);
    this._stdService.addStd(obj)
    this.formCont.reset()
    this._snackBar.onSnackBar('The new student is added successfully!!!')
    }else{
      this._snackBar.onSnackBar("Field can't be empty !!!")
    }
  }
  onUpdateFlag$ ! : boolean
  onUpdate(){
    let updated_obj={
      ...this.formCont.value,
      id : this.editId
    }
    // console.log(updated_obj);
    this._stdService.updateObj(updated_obj)
    this.isEditMode = false
    this.formCont.reset()
    this._snackBar.onSnackBar('The student detail is updated successfully!!!')
  }

}
