import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AuthGuard } from './shared/classes/authGuard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPossitionsComponent } from './order-page/order-possitions/order-possitions.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsPageComponent,
      },
      {
        path: 'history',
        component: HistoryPageComponent,
      },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          {
            path: '',
            component: OrderCategoriesComponent,
          },
          {
            path: ':id',
            component: OrderPossitionsComponent,
          },
        ],
      },
      {
        path: 'categories',
        component: CategoriesPageComponent,
      },
      {
        path: 'categories/new',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/:id',
        component: CategoriesFormComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
