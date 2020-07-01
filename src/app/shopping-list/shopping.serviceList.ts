import { Ingredent } from '../share/Ingredents.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService {
  //ingredentChange = new EventEmitter<Ingredent[]>();/*converted to Subject*/
  startEditing = new Subject<number>();
  ingredentChange = new Subject<Ingredent[]>();
  private ingredents: Ingredent[] = [
    new Ingredent('Chilli', 5),
    new Ingredent('Apple', 15),
    new Ingredent('Tomato', 20),
  ];

  getIngredent(index) {
    return this.ingredents[index];
  }
  getIngredents = () => {
    return this.ingredents.slice();
  };
  addIngredent(data: Ingredent) {
    this.ingredents.push(data); /*Item was add but due to slice not shared*/
    //this.ingredentChange.emit(this.ingredents.slice()); /*ngOnInit call this*/
    this.ingredentChange.next(this.ingredents.slice());
    /*after onvert subject, now use nex*/
  }
  updateIngedent(index, newIngredent) {
    this.ingredents[index] = newIngredent;
    this.ingredentChange.next(this.ingredents.slice());
  }
  deleteIngredent(index) {
    this.ingredents.splice(index, 1);
    this.ingredentChange.next(this.ingredents.slice());
  }
}
