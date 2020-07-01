import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService, private router: Router) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipe();
    this.recipeService.recipeChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
