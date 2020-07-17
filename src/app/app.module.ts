import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RightnavComponent } from './rightnav/rightnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneConfirmationComponent } from './login-method/phone-confirmation.component';

import { materialModules } from './app-material.module';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, FooterComponent, RightnavComponent,
    routingComponents,
    DashboardComponent,
    PhoneConfirmationComponent,
    UpdatePhoneComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule, CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule,
    materialModules
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
