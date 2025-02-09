import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  Optional,
  Inject,
  HostBinding
} from '@angular/core';
import { XMoveBoxAnimation, XIsChange, XIsFunction, XConfigService, XIsEmpty, XClearClass, XOpacityAnimation } from '@ng-nest/ui/core';
import { XDialogPrefix, XDialogOverlayRef, XDialogProperty, XDialogContainer, XDialogAction, X_DIALOG_CONTAINER } from './dialog.property';
import { PortalResizablePrefix, XPortalService } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { XI18nDialog, XI18nService } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { XResizableEvent } from '@ng-nest/ui/resizable';
import { XDialogContainerComponent } from './dialog-container.component';

@Component({
  selector: `${XDialogPrefix}`,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation, XOpacityAnimation]
})
export class XDialogComponent extends XDialogProperty implements OnChanges, OnDestroy {
  @HostBinding('class.x-dialog-visible') get getVisible() {
    return this.visible;
  }
  @ViewChild('dialogTpl', { static: false }) dialogTpl!: TemplateRef<void>;
  dialogRef!: XDialogOverlayRef;
  backdropClick$!: Subscription;
  scrollStrategy: BlockScrollStrategy;
  locale: XI18nDialog = {};
  overlayElement?: HTMLElement;
  dialogContent?: HTMLElement;
  initHeight? = 0;
  initContentHeight? = 0;
  isMaximize = false;
  isDefaultMaximize = false;
  dialogBox: { [key: string]: any } = {};
  contentBox: XResizableEvent = {};
  distance = { x: 0, y: 0 };
  viewInit = false;
  action: XDialogAction | null = null;
  containerInit = false;

  private _unSubject = new Subject<void>();

  get getCancelText() {
    return this.cancelText || this.locale.cancelText;
  }

  get getConfirmText() {
    return this.confirmText || this.locale.confirmText;
  }

  get getStyle() {
    return this.container
      ? {
          ...this.protalService.setContainerStyle(this.placement, this.offset),
          width: this.width,
          height: this.height,
          minWidth: this.minWidth,
          minHeight: this.minHeight
        }
      : {};
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public protalService: XPortalService,
    public overlay: Overlay,
    public i18n: XI18nService,
    public configService: XConfigService,
    @Optional() @Inject(X_DIALOG_CONTAINER) public container?: XDialogContainerComponent
  ) {
    super();
    this.scrollStrategy = this.protalService.overlay.scrollStrategies.block();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.dialog as XI18nDialog),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
    this.dialogBox['draggable'] = this.draggable;
    this.dialogBox['resizable'] = this.resizable;
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { visible, placement } = changes;
    XIsChange(visible) && this.setVisible();
    if (XIsChange(placement)) {
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  ngAfterViewInit() {
    this.viewInit = true;
    setTimeout(() => this.visible && this.create());
  }

  unsubscribe() {
    this.backdropClick$?.unsubscribe();
  }

  setClassMap() {
    for (let key in this.classMap) {
      this.renderer.removeClass(this.elementRef.nativeElement, key);
    }
    XClearClass(this.classMap);
    this.classMap = {
      [`${XDialogPrefix}-${this.placement}`]: !XIsEmpty(this.placement)
    };
    for (let key in this.classMap) {
      this.renderer.addClass(this.elementRef.nativeElement, key);
    }
  }

  setVisible() {
    if (!this.viewInit) return;
    if (this.visible) {
      this.create();
    } else {
      this.onClose('close', false);
    }
  }

  create() {
    if (this.container) {
      this.containerInit = true;
      return;
    }
    this.dialogRef = this.protalService.attach({
      content: this.dialogTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        panelClass: [XDialogContainer, this.className],
        hasBackdrop: Boolean(this.hasBackdrop),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        width: this.width,
        height: this.height,
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        positionStrategy: this.protalService.setPlace(this.placement, this.offset)
      }
    });
    const { hostElement, overlayElement } = this.dialogRef.overlayRef!;
    this.overlayElement = overlayElement;
    this.setWidthHeight();
    Object.assign(this.dialogBox, {
      width: this.width,
      height: this.height,
      minWidth: this.minWidth,
      minHeight: this.minHeight
    });
    if (this.resizable && !this.isDefaultMaximize) {
      this.renderer.addClass(hostElement, PortalResizablePrefix);
      setTimeout(() => {
        Object.assign(this.dialogBox, this.protalService.setResizable(this.overlayElement!, this.placement));
        this.offsetLeft = this.overlayElement!.offsetLeft;
        this.offsetTop = this.overlayElement!.offsetTop;
        const dialogDraggable = this.overlayElement?.querySelector('.x-alert-draggable')!;
        this.initHeight = dialogDraggable.clientHeight;
        this.dialogContent = this.overlayElement?.querySelector('.x-dialog-content')!;
        this.initContentHeight = this.dialogContent.clientHeight;
      });
    }
    if (this.hasBackdrop && this.backdropClose && this.dialogRef?.overlayRef) {
      this.backdropClick$ = this.dialogRef.overlayRef.backdropClick().subscribe(() => this.onClose('close'));
    }
  }

  setWidthHeight() {
    const ws = ['100%', '100vw'];
    const hs = ['100%', '100vh'];
    if (ws.includes(this.width as string) && hs.includes(this.height as string)) {
      this.isDefaultMaximize = true;
      this.resizable = false;
      this.draggable = false;
      this.maximize = false;
    }
  }

  portalAttached() {
    return this.dialogRef?.overlayRef?.hasAttached();
  }

  onClose(action: XDialogAction, execFunction = true) {
    if (!this.portalAttached() && !this.container) return;
    if (this.container && !this.containerInit) return;
    if (XIsFunction(this.beforeClose) && execFunction) {
      this.beforeClose(action);
      this.action = action;
    } else {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      if (this.portalAttached()) {
        this.dialogRef?.overlayRef?.detach();
        this.unsubscribe();
      }
      if ([action, this.action].includes('confirm')) {
        this.confirm.emit();
      }
      if ([action, this.action].includes('cancel')) {
        this.cancel.emit();
      }
      this.containerInit = false;
      this.action = null;
      this.close.emit();
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.distance = { x: this.distance.x + $event.distance.x, y: this.distance.y + $event.distance.y };
  }

  onSize() {
    if (!this.dialogRef) return;
    this.isMaximize = !this.isMaximize;
    if (this.isMaximize) {
      this.onMaximize();
    } else {
      this.onMinimize();
    }
  }

  onMaximize() {
    this.dialogRef.overlayRef?.updateSize({
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '100%'
    });
    this.dialogBox['minWidth'] = '100%';
    this.dialogBox['minHeight'] = '100%';
    this.dialogBox['draggable'] = false;
    this.dialogBox['resizable'] = false;
    if (this.resizable) {
      this.renderer.setStyle(this.overlayElement, 'margin', '0 0 0 0');
    }
    if (this.draggable) {
      this.dialogBox['distance'] = { x: 0, y: 0 };
    }
  }

  onMinimize() {
    this.dialogBox['minWidth'] = this.minWidth;
    this.dialogBox['minHeight'] = this.minHeight;
    this.dialogBox['draggable'] = this.draggable;
    this.dialogBox['resizable'] = this.resizable;
    this.dialogRef.overlayRef?.updateSize({
      width: this.dialogBox['width'],
      height: this.dialogBox['height'],
      minWidth: this.dialogBox['minWidth'],
      minHeight: this.dialogBox['minHeight']
    });
    if (this.draggable) {
      this.dialogBox['distance'] = { ...this.distance };
    }
    if (this.resizable) {
      if (this.dialogBox['marginTop']) {
        this.renderer.setStyle(this.overlayElement, 'margin-top', `${this.dialogBox['marginTop']}`);
      }
      if (this.dialogBox['marginLeft']) {
        this.renderer.setStyle(this.overlayElement, 'margin-left', `${this.dialogBox['marginLeft']}`);
      }
      if (this.dialogBox['marginRight']) {
        this.renderer.setStyle(this.overlayElement, 'margin-right', `${this.dialogBox['marginRight']}`);
      }
      if (this.dialogBox['marginBottom']) {
        this.renderer.setStyle(this.overlayElement, 'margin-bottom', `${this.dialogBox['marginBottom']}`);
      }
    }
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void') {
      this.closeDone.emit($event);
      this.isMaximize = false;
      this.dialogBox = {
        draggable: this.draggable,
        resizable: this.resizable
      };
      this.distance = { x: 0, y: 0 };
      this.dialogRef?.overlayRef?.dispose();
    } else {
      this.showDone.emit($event);
    }
  }

  onResizing(event: XResizableEvent) {
    const contentHeight = Number(this.initContentHeight) + Number(event.clientHeight) - Number(this.initHeight);
    this.renderer.setStyle(this.dialogContent, 'max-height', 'initial');
    this.renderer.setStyle(this.dialogContent, 'flex', 'initial');
    if (['top-start', 'top-end', 'bottom', 'top', 'bottom-start', 'bottom-end'].includes(event.direction as string)) {
      this.renderer.setStyle(this.dialogContent, 'height', `${contentHeight}px`);
    }
  }
}
