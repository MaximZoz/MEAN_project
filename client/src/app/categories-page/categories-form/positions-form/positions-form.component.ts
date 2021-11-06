import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PositionsService } from '../../../shared/services/positions.service';
import { Position } from '../../../shared/interfaces';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/shared/classes/materialService';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
})
export class PositionsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('modal') modalRef!: ElementRef;
  @Input('categoryId') categoryId!: string | undefined;

  positions: Position[] = [];
  loading = false;
  positionId = null;
  modal!: MaterialInstance;
  form!: FormGroup;

  constructor(private positionsService: PositionsService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.loading = true;
    this.positionsService
      .fetch(this.categoryId as string)
      .subscribe((positions) => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    const modal = this.modal as any;
    modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id as any;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });
    const modal = this.modal as any;

    modal.open();
    MaterialService.updateTextInput();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({ name: null, cost: 1 });
    const modal = this.modal as any;
    modal.open();
    MaterialService.updateTextInput();
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Удалить позицию "${position.name}"?`);

    if (decision) {
      this.positionsService.delete(position).subscribe(
        (response) => {
          const idx = this.positions.findIndex((p) => p._id === position._id);
          this.positions.splice(idx, 1);
          MaterialService.toast(response.message);
        },
        (error) => MaterialService.toast(error.error.message)
      );
    }
  }

  onCancel() {
    const modal = this.modal as any;
    modal.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId as string,
    };

    const completed = () => {
      const modal = this.modal as any;
      modal.close();
      this.form.reset({ name: '', cost: 1 });
      this.form.enable();
    };

    if (this.positionId) {
      newPosition._id = this.positionId as any;
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          const idx = this.positions.findIndex((p) => p._id === position._id);
          this.positions[idx] = position;
          MaterialService.toast('Изменения сохранены');
        },
        (error) => MaterialService.toast(error.error.message),
        completed
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Позиция создана');
          this.positions.push(position);
          1;
        },
        (error) => MaterialService.toast(error.error.message),
        completed
      );
    }
  }
}
