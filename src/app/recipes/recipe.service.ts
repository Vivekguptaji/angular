import { Subject } from 'rxjs';
import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';
import { Ingredent } from '../share/Ingredents.model';
import { identifierModuleUrl } from '@angular/compiler';
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  //   new Recipe(
  //     0,
  //     'Test Recipe',
  //     'It is very ummy recipe, that can be try',
  //     'https://picsum.photos/300/300',
  //     [new Ingredent('Chili', 20), new Ingredent('french fires', 35)]
  //   ),
  //   new Recipe(
  //     1,
  //     'Second Recipe',
  //     'Second is very ummy recipe, that can be try',
  //     'https://picsum.photos/200/200',
  //     [new Ingredent('Chili', 2), new Ingredent('french fires', 35)]
  //   ),
  // ];
  getRecipe() {
    return this.recipes.slice();
  }
  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipeById(id: number) {
    // return this.recipes.filter((value) => value.id === id)[0];

    return this.recipes.find((value) => value.id == id);
  }
  deleteRecipe(id) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
