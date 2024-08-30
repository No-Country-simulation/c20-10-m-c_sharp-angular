import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonDirective,
    RippleModule,
    NgTemplateOutlet,
    NgIf,
  ],
  templateUrl: './generic-dialog.component.html',
  styles: [],
})
export class GenericDialogComponent {
  @Input() visible = false;
  @Input() header = '';
  @Input() cancelLabel = '';
  @Input() acceptLabel = '';
  @Input() isAcceptDisabled = false;
  @Input() contentTemplate!: TemplateRef<any>;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cancel.emit();
  }

  onAccept() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.accept.emit();
  }

  onHide() {
    this.visibleChange.emit(false);
  }
}
