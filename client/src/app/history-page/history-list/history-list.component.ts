import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/shared/classes/materialService'
import { Order } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders!: Order[]
  @ViewChild('modal') modalRef!: ElementRef

  modal!: MaterialInstance
  selectedOrder!: Order
  constructor() {}
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  ngOnDestroy(): void {
    ;(this.modal as any).destroy()
  }

  selectOrder(order: Order) {
    this.selectedOrder = order

    const modal = this.modal as any
    modal.open()
  }

  computePrice(order: Order): number {
    return order.list.reduce(
      (total, item) => (total += item.quantity * item.cost),
      0,
    )
  }
  modalClose() {
    const modal = this.modal as any
    modal.close()
  }
}
