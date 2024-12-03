import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DetectionComponent } from './detection/detection.component';


Amplify.configure({
  Auth: {
    Cognito: {
    userPoolId: 'eu-north-1_WB6vezmAZ',
    userPoolClientId:'lqimnpstdggbdd1akni0lv09v'
    }
  }
});
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpdateComponent,
    LoginComponent,
    DetectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
