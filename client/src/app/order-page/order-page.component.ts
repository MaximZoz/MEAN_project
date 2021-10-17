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
import { MaterialInstance } from './../shared/classes/materialService';
import { OrderService } from './order.service';

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

  constructor(private router: Router, private orderService: OrderService) {}
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy(): void {
    const modal = this.modal as any;
    modal.destroy();
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
  submit() {
    const modal = this.modal as any;
    modal.close();
  }
}
