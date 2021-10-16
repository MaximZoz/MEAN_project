import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/materialService';
import { Position } from 'src/app/shared/interfaces';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { MaterialInstance } from './../../../shared/classes/materialService';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('modal') modalRef!: ElementRef;
  @Input('categoryId') categoryId: string | undefined;

  positions: Position[] = [];
  loading: boolean = false;
  modal!: MaterialInstance;

  constructor(private positionsService: PositionsService) {}

  ngOnInit() {
    this.loading = true;
    this.positionsService
      .fetch(this.categoryId as string)
      .subscribe((positions) => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    const modal = this.modal as any;
    return modal.destroy();
  }

  onSelectPosition(position: any) {
    this.modal.open;
  }
  onAddPosition() {
    const modal = this.modal as any;
    modal.open();
  }
}
