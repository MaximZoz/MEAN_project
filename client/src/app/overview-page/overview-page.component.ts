import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance } from '../shared/classes/materialService';
import { OverviewPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';
import { MaterialService } from './../shared/classes/materialService';

@Component({
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  data$!: Observable<OverviewPage>;
  yesterday = new Date();
  constructor(private service: AnalyticsService) {}

  ngOnInit(): void {
    this.data$ = this.service.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }
}
