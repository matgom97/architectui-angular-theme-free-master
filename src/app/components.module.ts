import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component imports
import { AccordionsComponent } from './DemoPages/Components/accordions/accordions.component';
import { TabsComponent } from './DemoPages/Components/tabs/tabs.component';
import { CarouselComponent } from './DemoPages/Components/carousel/carousel.component';
import { ModalsComponent } from './DemoPages/Components/modals/modals.component';
import { PaginationComponent } from './DemoPages/Components/pagination/pagination.component';
import { ProgressBarComponent } from './DemoPages/Components/progress-bar/progress-bar.component';
import { TooltipsPopoversComponent } from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';
import { Modal } from './DemoPages/Components/modal/modal';

@NgModule({
  declarations: [
    AccordionsComponent,
    TabsComponent,
    CarouselComponent,
    ModalsComponent,
    PaginationComponent,
    ProgressBarComponent,
    TooltipsPopoversComponent,
    Modal
  ],
  imports: [
  SharedModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule
],
  exports: [
    AccordionsComponent,
    TabsComponent,
    CarouselComponent,
    ModalsComponent,
    PaginationComponent,
    ProgressBarComponent,
    TooltipsPopoversComponent,
    Modal
  ]
})
export class ComponentsModule { }