import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        BrowserAnimationsModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, 
                   SidebarComponent,
                   HeaderComponent]
})
export class LayoutModule {}
