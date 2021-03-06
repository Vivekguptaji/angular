import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
      } /*New should be first as,so router will search after new*/,
      { path: ':id', component: RecipesDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', component: ErrorPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
