import { Injectable } from '@angular/core';
import { Position } from '../shared/interfaces';
import { OrderPosition } from '../shared/interfaces';

@Injectable()
export class OrderService {
  public categories!: string;
  public list: OrderPosition[] = [];
  public price: number = 0;

  add(position: Position) {
    const orderPosition = Object.assign(
      {},
      {
        name: position.name,
        cost: position.cost,
        quantity: position.quantity as number,
        _id: position._id as string,
      }
    );
    const candidate = this.list.find((p) => p._id === position._id);
    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.computePrice();
  }

  remove(orderPosition: OrderPosition) {
    this.list = this.list.filter((p) => p._id !== orderPosition._id);
    this.computePrice();
  }
  clear() {
    this.list = [];
    this.price = 0;
  }

  public getCategories(categories: string) {
    this.categories = categories;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }

  constructor() {}
}
