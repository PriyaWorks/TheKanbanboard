import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, 
  MatToolbarModule,MatIconModule, MatProgressSpinnerModule, MatFormFieldModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

import { TooltipModule, PopoverModule, ButtonsModule, MDBModalService, InputsModule, InputUtilitiesModule } from 'angular-bootstrap-md';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule, InputsModule, InputUtilitiesModule,
    FormsModule, ModalModule.forRoot(), TooltipModule, PopoverModule, ButtonsModule,
    MatCardModule,
    NgbModule,
    MatToolbarModule, MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule, WavesModule,
    MatTabsModule,MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
    
  ],
  providers: [MDBModalService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
