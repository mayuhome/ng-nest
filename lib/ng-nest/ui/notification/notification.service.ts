import { Injectable } from '@angular/core';
import { XTemplate, XIsXTemplate, fillDefault, XIsEmpty } from '@ng-nest/ui/core';
import {
  XNotificationInput,
  XNotificationOverlayRef,
  XNotificationType,
  XNotificationPlacement,
  XNotificationRef,
  XNotificationPortal
} from './notification.type';
import { XNotificationComponent } from './notification.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XPortalService } from '@ng-nest/ui/portal';

@Injectable()
export class XNotificationService {
  notifications: XNotificationPlacement = {};

  default: XNotificationInput = {
    type: 'info',
    width: '20rem',
    placement: 'top-end',
    offset: '0.5rem',
    effect: 'white',
    duration: 4500,
    showIcon: true
  };

  constructor(public portal: XPortalService) {}

  info(option: XTemplate | XNotificationInput): XNotificationRef {
    return this.createNotification(option, 'info');
  }

  success(option: XTemplate | XNotificationInput): XNotificationRef {
    return this.createNotification(option, 'success');
  }

  warning(option: XTemplate | XNotificationInput): XNotificationRef {
    return this.createNotification(option, 'warning');
  }

  error(option: XTemplate | XNotificationInput): XNotificationRef {
    return this.createNotification(option, 'error');
  }

  create(option: XNotificationInput): XNotificationOverlayRef {
    return this.portal.attach({
      content: XNotificationComponent,
      overlayConfig: {
        panelClass: XNotificationPortal,
        positionStrategy: this.portal.setPlace(option.placement, option.offset, option.width, option.height)
      }
    });
  }

  private createNotification(option: XTemplate | XNotificationInput, type: XNotificationType): XNotificationRef {
    let opt: XNotificationInput;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate, type: type };
    } else {
      opt = option as XNotificationInput;
      opt.type = type;
    }
    fillDefault(opt, this.default);
    return this.createNotificationPlacement(opt);
  }

  private createNotificationPlacement(option: XNotificationInput): XNotificationRef {
    let msgPlacement = this.notifications[option.placement];
    this.setDuration(option);
    if (XIsEmpty(msgPlacement) || !msgPlacement.ref.overlayRef.hasAttached()) {
      this.notifications[option.placement] = {
        ref: this.create(option),
        list: [option]
      };
    } else {
      this.notifications[option.placement].list = [...this.notifications[option.placement].list, option];
    }
    this.notificationChange(this.notifications[option.placement]);

    return this.notifications[option.placement];
  }

  private notificationChange(notification: XNotificationRef) {
    if (!notification.ref.overlayRef.hasAttached()) return;
    notification.ref.componentRef.instance.notification = notification;
    notification.ref.componentRef.instance.cdr.detectChanges();
  }

  private setDuration(option: XNotificationInput) {
    if (option.duration) {
      option.duration$ = of(true)
        .pipe(delay(option.duration))
        .subscribe(() => {
          this.removeNotification(option);
          option.duration$ && option.duration$.unsubscribe();
        });
    }
  }

  private removeNotification(option: XNotificationInput) {
    this.notifications[option.placement].ref.componentRef.instance.onClose(option);
  }
}
