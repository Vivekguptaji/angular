import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping.serviceList';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css'],
})
export class RecipesDetailsComponent implements OnInit {
  recipe: Recipe;
  constructor(
    private shopingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipeById(+params.id);
      if (!this.recipe) {
        this.router.navigate(['/'], { relativeTo: this.activatedRoute });
      }
    });
  }
  onClickShopingList() {
    this.recipe.ingredenets.map((ingredent) => {
      this.shopingListService.addIngredent(ingredent);
    });
  }
}
