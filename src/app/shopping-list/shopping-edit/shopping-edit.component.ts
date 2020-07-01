import { Subscription } from 'rxjs';
import { FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredent } from '../../share/Ingredents.model';
import { ShoppingListService } from '../shopping.serviceList';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingEditForm: NgForm;
  shoppingForm: FormGroup;
  subscription: Subscription;
  editedIndex = 0;
  editedMode = false;
  editedItem: Ingredent;
  constructor(private shoopingServiceList: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoopingServiceList.startEditing.subscribe(
      (index) => {
        this.editedMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoopingServiceList.getIngredent(index);
        this.shoppingEditForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSumbit(f: NgForm) {
    console.log(f);
    const ingredent = new Ingredent(f.value.name, f.value.amount);
    if (this.editedMode) {
      this.shoopingServiceList.updateIngedent(this.editedIndex, ingredent);
    } else {
      this.shoopingServiceList.addIngredent(ingredent);
    }
    this.shoppingEditForm.reset();
    this.editedMode = false;
  }
  onDelete() {
    this.shoppingEditForm.reset();
    this.editedMode = false;
    this.shoopingServiceList.deleteIngredent(this.editedIndex);
  }
}
