import { Recipe } from './../recipes/recipes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url = 'https://weathersample-a0194.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipe();
    this.http.put(this.url, recipes).subscribe((response) => {
      console.log('storeRecipes:', response);
    });
  }
  fetchRecipes() {
    this.http
      .get<Recipe[]>(this.url)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredenets: recipe.ingredenets ? recipe.ingredenets : [],
            };
          });
        })
      )
      .subscribe((recipe) => {
        this.recipeService.setRecipe(recipe);
        console.log(recipe);
      });
  }
}
