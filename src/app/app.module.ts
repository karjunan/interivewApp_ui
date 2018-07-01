import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { InterviewerGuard } from './shared/guard/interviewer.guard';
import { AccessDeniedModule } from './access-denied/access-denied.module';
import { RecruiterGuard } from './shared/guard/recruiter.guard';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,InterviewerGuard,RecruiterGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
