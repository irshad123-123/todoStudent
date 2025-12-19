import { Component, inject, OnInit } from '@angular/core';
import { StdService } from '../../services/std.service';
import { Istd } from '../../model/std';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  stdArr : Array<Istd> = []
  searchText : string = ''
  constructor(private _stdArr : StdService) { }
  ngOnInit(): void { 
    this._stdArr.fetchAll()
    .subscribe({
      next : res=>this.stdArr=res,
      error : err=> {}
    })
    this._stdArr.stdUpdateFlag$
      .subscribe(res=>{
        if(res){
          this.editStdId = ''
        }
      })
  }
  onRemove(obj:Istd){
    this._stdArr.removeObj(obj)
  }
  editStdId ! :string
  onEdit(obj : Istd){
    this._stdArr.posts$.next(obj)
    this.editStdId = obj.id
  }
}
