import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, AuthTokens } from '@aws-amplify/auth';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
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

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const payload = form.value;

      try {
        // Fetch authentication session
        const authSession = await fetchAuthSession();

        // Check if tokens exist
        if (authSession?.tokens?.idToken) {
          const jwtToken = authSession.tokens.idToken; // Get the ID Token (JWT)
          console.log(jwtToken);

          // Attach token to the Authorization header
          const headers = {
            Authorization: jwtToken.toString(),
          };

          // Make the HTTP POST request
          this.http.post(this.apiUrl, payload, { headers }).subscribe({
            next: (response) => {
              console.log('Item successfully added:', response);
              alert('Item successfully added!');
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error adding item:', error);
              alert('Failed to add item. Check console for details.');
            },
          });
        } else {
          throw new Error('ID Token (JWT) is missing.');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        alert('You are not authenticated. Please log in.');
      }
    } else {
      alert('Form is invalid. Please fill in all required fields.');
    }
  }
}
