import { DataStorageService } from './../share/data.storage.serivec';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  constructor(
    private route: Router,
    private dataStorageService: DataStorageService
  ) {}
  onSaveRecipe() {
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipe() {
    this.dataStorageService.fetchRecipes();
  }
}
