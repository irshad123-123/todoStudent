import { Pipe, PipeTransform } from "@angular/core";
import { Istd } from "../model/std";

@Pipe({
    name : 'filter'
})
export class StudentFilter implements PipeTransform{

    transform(value: Array<Istd>, searchText : string ) : Array<Istd> {
        if(!value) return [];
        if(!searchText) return value;
        return value.filter(f=>
            f.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }
}