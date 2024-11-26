import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  // API Gateway endpoint
  private apiUrl = 'https://l8ty3pjj97.execute-api.eu-north-1.amazonaws.com/prd/addItemLambda';


  constructor(public authenticator: AuthenticatorService, private http: HttpClient, private router: Router) {
    Amplify.configure({
      Auth: {
        Cognito: {
        userPoolId: 'eu-north-1_WB6vezmAZ',
        userPoolClientId:'lqimnpstdggbdd1akni0lv09v'
        }
      }
    });
  }
  
onSubmit (form:any){
  if (form.valid) {
    const payload = form.value;
    this.http.post(this.apiUrl, payload).subscribe({
      next: (Response)=> {
        console.log('Item successfully added:', Response);
        alert('Item successfully added!');
        this.router.navigate(['/home']); // Navigate to the home route
      },
      error: (error) => {
        console.error('Error adding item:', error);
        alert('Failed to add item. Check console for details.');
      },
    });
  }
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