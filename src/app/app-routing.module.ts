import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginMethodComponent } from './login-method/login-method.component';
import { UserprofileComponent } from './rightnav/leftNavProfile/userprofile/userprofile.component';
import { PhoneComponent } from './login-method/phone.component';
import { PhoneConfirmationComponent } from './login-method/phone-confirmation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogOffComponent } from './log-off/log-off.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'login', component: LoginMethodComponent },
  { path: 'profile', component: UserprofileComponent },
  {
    path: 'phone', children: [
      { path: '', component: PhoneComponent },
      { path: 'confirm', component: PhoneConfirmationComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sellTrash', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'logoff', component: LogOffComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }

export const routingComponents = [RegistrationComponent, LoginMethodComponent, UserprofileComponent,
  PhoneComponent, PhoneConfirmationComponent, LogOffComponent, AboutUsComponent, AdminComponent];
