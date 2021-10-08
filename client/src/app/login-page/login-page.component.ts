import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/services/classes/materialService';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.aSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast(
          'Терерь вы можете войти в систему, используя сови данные'
        );
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Сессия истекла, войдите в систему снова');
      }
    });
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        MaterialService.toast('Успешно');
        // this.router.navigate(['/overview']);
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }
}
