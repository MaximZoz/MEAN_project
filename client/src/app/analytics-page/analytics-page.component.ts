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

import Chart from 'chart.js/auto';

function createChartConfig({ labels, data, label, color }: any) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}

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
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255,99,132)',
    } as any;
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54,162,235)',
    } as any;
    this.sub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.pending = false;
      this.avarage = data.average;
      gainConfig.labels = data.chart.map((i) => i.label);
      gainConfig.data = data.chart.map((i) => i.gain);
      orderConfig.labels = data.chart.map((i) => i.label);
      orderConfig.data = data.chart.map((i) => i.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      orderCtx.canvas.height = '300px';

      new Chart<any>(gainCtx, createChartConfig(gainConfig));
      new Chart<any>(orderCtx, createChartConfig(orderConfig));
    });
  }
  ngOnInit() {}
}
