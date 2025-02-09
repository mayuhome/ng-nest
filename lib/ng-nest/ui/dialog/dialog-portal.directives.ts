import { Directive, ElementRef, HostBinding, HostListener, Optional } from '@angular/core';
import { XDialogRef } from './dialog-ref';

@Directive({
  selector: `[x-dialog-close]`
})
export class XDialogCloseDirective {
  @HostListener('click', ['$event']) onCloseClick() {
    this.dialogRef && this.dialogRef.close();
  }
  constructor(@Optional() public dialogRef: XDialogRef<any>) {}
}

@Directive({
  selector: `[x-dialog-title]`
})
export class XDialogTitleDirective {
  @HostBinding('class.x-dialog-portal-title') _has = true;
}

@Directive({
  selector: `[x-dialog-content], x-dialog-content`
})
export class XDialogContentDirective {
  @HostBinding('class.x-dialog-portal-content') _has = true;
}

@Directive({
  selector: `[x-dialog-actions], x-dialog-actions`
})
export class XDialogActionsDirective {
  @HostBinding('class.x-dialog-portal-actions') _has = true;
}

@Directive({
  selector: `[x-dialog-drag-handle], x-dialog-drag-handle`
})
export class XDialogDragHandleDirective {
  @HostBinding('class.x-dialog-portal-drag-handle') get getDraggable() {
    return !this.dialogRef.fullscreen && this.dialogRef.option.draggable;
  }
  constructor(@Optional() public dialogRef: XDialogRef<any>, private elementRef: ElementRef) {}

  ngOnInit() {
    this.dialogRef.dragHandleRefs.push(this.elementRef);
  }
}

@Directive({
  selector: `[x-dialog-fullscreen], x-dialog-fullscreen`
})
export class XDialogFullscreenDirective {
  @HostListener('click', ['$event']) onFullscreenClick() {
    this.dialogRef && this.dialogRef.onFullscreen();
  }
  constructor(@Optional() public dialogRef: XDialogRef<any>) {}
}
