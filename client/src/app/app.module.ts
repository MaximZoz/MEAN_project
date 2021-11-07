import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPossitionsComponent } from './order-page/order-possitions/order-possitions.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TokenInterceptor } from './shared/classes/tokenInterceptor';

@NgModule({
  declarations: [
    AnalyticsPageComponent,
    AppComponent,
    AuthLayoutComponent,
    CategoriesFormComponent,
    CategoriesPageComponent,
    HistoryFilterComponent,
    HistoryListComponent,
    HistoryPageComponent,
    LoaderComponent,
    LoginPageComponent,
    OrderCategoriesComponent,
    OrderPageComponent,
    OrderPossitionsComponent,
    OverviewPageComponent,
    PositionsFormComponent,
    RegisterPageComponent,
    SiteLayoutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
