import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { XDatePickerPrefix, XDatePickerProperty, XDatePickerModelType } from './date-picker.property';
import { XIsEmpty, XIsDate, XIsNumber, XIsChange, XCorner, XClearClass, XIsString, XConfigService } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XDatePickerPrefix}`,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent), DatePipe]
})
export class XDatePickerComponent extends XDatePickerProperty implements OnInit, OnChanges {
  @ViewChild('datePicker', { static: true }) datePicker!: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;

  modelType: XDatePickerModelType = 'date';
  numberValue!: number | string;
  isInput = false;

  override writeValue(value: any) {
    if (XIsDate(value)) {
      this.modelType = 'date';
      this.numberValue = value.getTime();
    } else if (XIsNumber(value)) {
      this.modelType = 'number';
      this.numberValue = value;
    } else if (XIsString(value)) {
      this.modelType = 'string';
      const valueTime = new Date(value).getTime();
      this.numberValue = !isNaN(valueTime) ? valueTime : '';
    } else if (XIsEmpty(value)) {
      this.numberValue = '';
    }
    this.value = value;
    this.setDisplayValue(this.numberValue);
    this.valueChange.next(this.numberValue);
    this.cdr.detectChanges();
  }

  enter: boolean = false;
  inputClearable: boolean = false;
  animating = false;
  displayValue: any = '';
  portal!: XPortalOverlayRef<XDatePickerPortalComponent>;
  icon: string = 'fto-calendar';
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public configService: XConfigService,
    public override cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    private overlay: Overlay
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.datePicker.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setFormat();
    this.setClassMap();
    this.setSubject();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;
    if (XIsChange(type)) {
      this.setFormat();
      this.setDisplayValue(this.numberValue);
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  setFormat() {
    if (this.format !== 'yyyy-MM-dd') return;
    if (this.type === 'date') {
      this.format = 'yyyy-MM-dd';
    } else if (this.type === 'year') {
      this.format = 'yyyy';
    } else if (this.type === 'month') {
      this.format = 'yyyy-MM';
    } else if (this.type === 'date-time') {
      this.format = 'yyyy-MM-dd HH:mm:ss';
    } else if (this.type === 'date-hour') {
      this.format = 'yyyy-MM-dd HH';
    } else if (this.type === 'date-minute') {
      this.format = 'yyyy-MM-dd HH:mm';
    }
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!this.clearable) return;
    if (!XIsEmpty(this.numberValue)) {
      this.icon = '';
      this.inputClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (!this.clearable) return;
    if (this.inputClearable) {
      this.icon = 'fto-calendar';
      this.inputClearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = '';
    this.numberValue = '';
    this.displayValue = '';
    this.mleave();
    this.valueChange.next(this.numberValue);
    this.modelChange();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
    this.formControlValidator();
  }

  getValue() {
    return ['date', 'string'].includes(this.modelType) ? new Date(this.numberValue) : this.numberValue;
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active = false;
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal() {
    if (this.disabled || this.animating) return;
    this.active = true;
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.setDisplayValue(this.numberValue);
        this.closeSubject.next();
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      type: this.type,
      value: this.numberValue,
      placement: this.placement,
      preset: this.preset,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      inputCom: this.inputCom,
      closePortal: () => this.closeSubject.next(),
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: Date, sure = true) => this.onNodeClick(node, sure),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(date: Date, sure = true) {
    this.isInput = false;
    if (sure) {
      this.numberValue = date.getTime();
      this.value = this.getValue();
      this.setDisplayValue(this.numberValue);
      this.closeSubject.next();
      this.modelChange();
      this.nodeEmit.emit(this.numberValue);
    } else {
      this.setDisplayValue(date.getTime());
      this.cdr.markForCheck();
    }
  }

  onInput() {
    this.isInput = true;
  }

  setDisplayValue(dateNumber: number | string) {
    if (this.isInput && isNaN(this.displayValue) && !isNaN(Date.parse(this.displayValue))) {
      this.displayValue = this.datePipe.transform(this.displayValue, this.format);
      this.numberValue = new Date(this.displayValue).getTime();
      this.value = this.getValue();
      this.modelChange();
      this.isInput = false;
    } else {
      this.displayValue = this.datePipe.transform(dateNumber, this.format);
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-date-picker-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
