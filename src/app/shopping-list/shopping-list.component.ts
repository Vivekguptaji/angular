import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredent } from '../share/Ingredents.model';
import { ShoppingListService } from './shopping.serviceList';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredents: Ingredent[] = [];
  ingredentChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredents = this.shoppingListService.getIngredents();
    this.ingredentChangeSub = this.shoppingListService.ingredentChange.subscribe(
      (ingredents) => {
        this.ingredents = ingredents;
      }
    );
  }
  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.ingredentChangeSub.unsubscribe();
    /*We should clear observable once page done..*/
  }
}
