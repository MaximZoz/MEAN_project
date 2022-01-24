import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AnalyticsPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('gain') gainRef!: ElementRef;
  @ViewChild('order') orderRef!: ElementRef;
  avarage!: number;
  pending: boolean = true;
  sub!: Subscription;

  constructor(private service: AnalyticsService) {}
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.sub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.pending = false;
      this.avarage = data.average;
    });
  }
  ngOnInit() {}
}
