import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure({
      Auth: {
        Cognito: {
        userPoolId: 'eu-north-1_WB6vezmAZ',
        userPoolClientId:'lqimnpstdggbdd1akni0lv09v'
        }
      }
    });
  }
  
  formFields = {
    signUp: {
      username: {
        order: 1
      },
      name: {
        order: 2
      },
      email: {
        order: 3
      },
      password: {
        order: 4
      },
      confirm_password: {
        order: 5
      }
    },
}
  
}