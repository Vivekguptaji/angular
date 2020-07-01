import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChangedSub: Subscription;
  constructor(private recipeService: RecipeService, private router: Router) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipe();
    this.recipeChangedSub = this.recipeService.recipeChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }
  ngOnDestroy() {
    this.recipeChangedSub.unsubscribe();
  }
}
