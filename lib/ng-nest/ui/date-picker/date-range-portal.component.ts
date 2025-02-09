import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  HostListener
} from '@angular/core';
import { XDateRangePortalPrefix, XDatePickerPreset, XDatePickerType } from './date-picker.property';
import { XIsEmpty, XConnectBaseAnimation, XPositionTopBottom, XAddMonths, XAddYears } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { XI18nService, XI18nDatePicker } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XDateRangePortalPrefix}`,
  templateUrl: './date-range-portal.component.html',
  styleUrls: ['./date-range-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation],
  providers: [DatePipe, LowerCasePipe]
})
export class XDateRangePortalComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }

  type: XDatePickerType = 'date';
  display = new Date();
  model!: Date;
  startModel!: Date;
  endModel!: Date;
  startYear!: number;
  startDisplay: Date = new Date();
  endDisplay: Date = XAddMonths(this.startDisplay, 1);
  value: number[] = [];
  valueChange!: Subject<number[]>;
  positionChange!: Subject<any>;
  inputActiveChange!: Subject<'start' | 'end'>;
  activeType!: 'start' | 'end';
  animating!: Function;
  closePortal!: Function;
  destroyPortal!: Function;
  nodeEmit!: (date: Date[], sure?: boolean) => void;
  startNodeEmit!: (date: Date) => void;
  endNodeEmit!: (date: Date) => void;
  locale: XI18nDatePicker = {};
  time!: number;
  preset: XDatePickerPreset[] = [];
  private _type!: XDatePickerType;
  private _unSubject = new Subject<void>();

  constructor(public datePipe: DatePipe, public lowerCasePipe: LowerCasePipe, public cdr: ChangeDetectorRef, public i18n: XI18nService) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.init();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    this.inputActiveChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.activeType = x;
      this.setDefault();
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.datePicker as XI18nDatePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.value = [];
      this.model = this.display;
      this.startModel = this.model;
      this.endModel = XAddMonths(this.model, 1);
      this.setDisplay(this.model);
    }
    this._type = this.type;
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const type = this.activeType || 'start';
    if (type === 'start') {
      this.startModel = new Date(this.value[0]);
      this.startDisplay = this.startModel;
      this.endModel = XAddMonths(this.startModel, 1);
      this.endDisplay = this.endModel;
    } else if (type === 'end') {
      this.endModel = new Date(this.value[1]);
      this.endDisplay = this.endModel;
      this.startModel = XAddMonths(this.endModel, -1);
      this.startDisplay = this.startModel;
    }
    this.cdr.detectChanges();
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.startDisplay = this.display;
    this.endDisplay = XAddMonths(this.display, 1);
  }

  dateChange(date: Date, type: 'start' | 'end') {
    let time = date.getTime();
    if (this.value.length === 0) {
      this.value = [time];
      this.startNodeEmit(date);
    } else if (this.value.length === 1) {
      if (time > this.value[0]) {
        this.value = [...this.value, time];
        this.endNodeEmit(date);
      } else {
        this.value = [time, ...this.value];
        this.startNodeEmit(date);
        this.endNodeEmit(new Date(this.value[1]));
      }
      this.nodeEmit(this.value.map((x) => new Date(x)));
    } else {
      if (type === 'start') {
        this.value = [time, this.value[1]];
        this.startNodeEmit(date);
      } else if (type === 'end') {
        this.value = [this.value[0], time];
        this.cdr.detectChanges();
        this.endNodeEmit(date);
      }
      this.nodeEmit(
        this.value.map((x) => new Date(x)),
        type !== 'start'
      );
    }
  }

  typeChange(type: XDatePickerType) {
    this.type = type;
    this.cdr.detectChanges();
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'month') {
      this.model = date;
      // this.nodeEmit(date);
    } else {
      this.type = this._type;
    }
    this.cdr.detectChanges();
  }

  yearChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'year') {
      this.model = date;
      // this.nodeEmit(date);
    } else {
      this.type = 'month';
    }
    this.cdr.detectChanges();
  }

  yearStartChange(number: number) {
    this.startYear = number;
    this.cdr.detectChanges();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  nextYears(num: number) {
    this.startYear += num;
    let date = new Date(this.display);
    date.setFullYear(this.startYear);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  getLocaleMonth(date: Date) {
    return (this.locale as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  selectTime(time: Date) {
    this.time = time.getTime();
    // this.nodeEmit(this.setModel(this.model, time), false);
    this.cdr.detectChanges();
  }

  setModel(date: Date, time: Date) {
    this.model = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    return this.model;
  }

  startYearChange(num: number) {
    this.endDisplay = XAddYears(this.endDisplay, num);
  }

  endYearChange(num: number) {
    this.startDisplay = XAddYears(this.startDisplay, num);
  }

  startMonthChange(num: number) {
    this.endDisplay = XAddMonths(this.endDisplay, num);
  }

  endMonthChange(num: number) {
    this.startDisplay = XAddMonths(this.startDisplay, num);
  }
}
