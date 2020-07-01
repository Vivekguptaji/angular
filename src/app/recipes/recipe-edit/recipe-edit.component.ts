import { Recipe } from './../recipes.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeSerivce: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('editMode', this.editMode);
      this.initForm();
    });
  }
  onAddIngredient() {
    const ingredents = this.recipeForm.get('ingredents') as FormArray;
    ingredents.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(0|[1-9][0-9]*)$/),
        ]),
      })
    );
  }
  onSaveSubmit() {
    let recipeAdd = new Recipe(
      Math.round(Math.random() * 100),
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredents
    );
    if (this.editMode) {
      this.recipeSerivce.updateRecipe(this.id, recipeAdd);
    } else {
      this.recipeSerivce.addRecipe(recipeAdd);
    }
    console.log(this.recipeForm.value);
  }
  get controls() {
    // a getter!

    const ingredents = this.recipeForm.get('ingredents') as FormArray;
    return ingredents.controls;
  }
  initForm() {
    let recipeName = '';
    let imagepath = '';
    let description = '';
    let ingredents = new FormArray([]);
    if (this.editMode) {
      const selectedRecipe = this.recipeSerivce.getRecipeById(this.id);
      recipeName = selectedRecipe.name;
      imagepath = selectedRecipe.imagePath;
      description = selectedRecipe.description;
      if (selectedRecipe.ingredenets) {
        for (let ingredent of selectedRecipe.ingredenets) {
          ingredents.push(
            new FormGroup({
              name: new FormControl(ingredent.name, Validators.required),
              amount: new FormControl(ingredent.amount, [
                Validators.required,
                Validators.pattern(/^(0|[1-9][0-9]*)$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagepath, Validators.required),
      ingredents: ingredents,
    });
  }
  onDeleteIngredient(index) {
    const ingredentArray = this.recipeForm.get('ingredents') as FormArray;
    ingredentArray.removeAt(index);
  }
  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../']);
  }
}
