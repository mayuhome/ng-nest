import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XEmptyPrefix, XEmptyProperty } from './empty.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XI18nService } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XEmptyPrefix}`,
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XEmptyComponent extends XEmptyProperty {
  private _unSubject = new Subject<void>();

  constructor(public configService: XConfigService, public cdr: ChangeDetectorRef, public i18n: XI18nService) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }
}
