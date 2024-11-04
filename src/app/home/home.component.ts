import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AuthService } from '../AuthService';
import { Injectable } from '@angular/core';
import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens, JWT } from 'aws-amplify/auth';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})


export class HomeComponent implements OnInit {
  public token: JWT | undefined;
  public name: string | undefined;
  apiResponse: any;
  apiError: string | null = null;
    // Define an ordered array for header configuration
    headers: { key: string; displayName: string }[] = [
      { key: 'item', displayName: 'Item' },
      { key: 'Current Stock', displayName: 'Current Stock' },
      { key: 'Min. Stock', displayName: 'Min. Stock' },
      // Add other headers in the desired order
    ];


  constructor(public authenticator: AuthenticatorService, private apiService: ApiService) {
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
async getCurrentUserFullName(): Promise<string | undefined> {
  let cognitoToken = await ((await fetchAuthSession()).tokens);
  this.name = cognitoToken?.idToken?.payload['name']?.toString();
  return this.name = cognitoToken?.idToken?.payload['name']?.toString();
}
objectKeys(obj: any): string[] {
  return Object.keys(obj);
}

  // Helper method to check if current stock is below minimum stock
isLowStock(item: any): boolean {
    return Number(item['Current Stock']) < Number(item['Min. Stock']);
}
async ngOnInit(): Promise<void> {
  this.token = await (await fetchAuthSession()).tokens?.idToken;
  console.log(this.token);
  let cognitoToken = await ((await fetchAuthSession()).tokens);
  this.name = cognitoToken?.idToken?.payload['name']?.toString();
  this.apiService.getData().subscribe(
    data => {
      console.log('GET response:', data);
      this.apiResponse = data;
    },
    error => {
      console.error('GET error:', error);
      this.apiError = 'An error occurred while fetching data';
    }
  );
}
}