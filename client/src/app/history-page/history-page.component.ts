import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  MaterialInstance,
  MaterialService,
} from '../shared/classes/materialService';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible: boolean = false;
  tooltip!: MaterialInstance;
  @ViewChild('tooltip') tooltipRef!: ElementRef;
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {
    (this.tooltip as any).destroy();
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }
}
