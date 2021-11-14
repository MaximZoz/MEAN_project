import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import {
  MaterialInstance,
  MaterialService,
} from '../shared/classes/materialService'
import { Order } from '../shared/interfaces'
import { OrdersService } from '../shared/services/orders.service'

const STEP = 2
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible: boolean = false
  tooltip!: MaterialInstance
  oSub!: Subscription
  offset: number = 0
  limit: number = STEP
  orders: Order[] = []
  loading: boolean = false
  reloading: boolean = false
  noMoreOrders:boolean = false

  @ViewChild('tooltip') tooltipRef!: ElementRef

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit,
    }

    this.oSub = this.ordersService.fetch(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders)
      this.loading = false
      this.reloading = false
      this.noMoreOrders = orders.length < STEP
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy() {
    const tooltip = this.tooltip as any
    this.oSub.unsubscribe()
    tooltip.destroy()
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }
}
