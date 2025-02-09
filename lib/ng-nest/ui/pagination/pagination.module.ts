import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationComponent } from './pagination.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPaginationProperty } from './pagination.property';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XSelectModule } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XPaginationComponent, XPaginationProperty],
  exports: [XPaginationComponent],
  imports: [CommonModule, FormsModule, XButtonModule, XI18nModule, XSelectModule, XInputModule, XOutletModule]
})
export class XPaginationModule {}
