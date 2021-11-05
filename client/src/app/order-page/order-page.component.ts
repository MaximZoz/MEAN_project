import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/materialService';
import { Order, OrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { MaterialInstance } from './../shared/classes/materialService';
import { OrderService } from './order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef;

  isRoot!: boolean;
  modal!: MaterialInstance;
  pending = false;
  oSub!: Subscription;

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) {}
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy(): void {
    const modal = this.modal as any;
    modal.destroy();

    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }
  open() {
    const modal = this.modal as any;
    modal.open();
  }
  close() {
    const modal = this.modal as any;
    modal.close();
  }
  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }
  submit() {
    this.pending = true;
    const modal = this.modal as any;
    modal.close();
    const order: Order = {
      list: this.order.list.map((item) => {
        delete item._id;
        return item;
      }) as unknown as OrderPosition[],
    };
    const oSub = this.ordersService.create(order).subscribe(
      (newOrders) => {
        MaterialService.toast(`Заказ №${newOrders.order} был добавлен`);
        this.order.clear();
      },
      (error) => {
        MaterialService.toast(error.error.message);
      },
      () => {
        const modal = this.modal as any;
        modal.close();
        this.pending = false;
      }
    );
  }
}
