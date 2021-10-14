import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MaterialService } from 'src/app/shared/classes/materialService';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef!: ElementRef;

  form!: FormGroup;
  isNew: boolean = true;
  image!: File;
  imagePreview: string | ArrayBuffer | null | undefined = '';
  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable();
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params?.id) {
            this.isNew = false;
            return this.categoriesService.getById(params?.id);
          }
          return of(null);
        })
      )
      .subscribe(
        (category) => {
          this.form.enable();
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name,
            });
            this.imagePreview = category?.imageSrc;
            MaterialService.updateTextInput();
          }
        },
        (error) => {
          MaterialService.toast(error.error.message);
        }
      );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }
  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(
        this.form.value.name,
        this.category._id as string,
        this.image
      );
    }

    obs$.subscribe(
      (category) => {
        this.category = category;
        MaterialService.toast('Изменения сохранены.');
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }
}
