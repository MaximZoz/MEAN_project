import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  loading: boolean = false;
  categories!: Category[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loading = true;
    this.categoriesService.fetch().subscribe((categories) => {
      this.loading = false;
      this.categories = categories;
    });
  }
}
