import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
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
      { key: 'Unit', displayName: 'Unit' },
      { key: 'Current Stock', displayName: 'Current Stock' },
      { key: 'Min. Stock', displayName: 'Min. Stock' },
      { key: 'Last Update Date(UTC)', displayName: 'Last Update Date(UTC)' },
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

  // Optional: handle logic when stock changes, such as saving data
onStockChange(item: any) {
    console.log('Stock updated for item:', item);
      // Prepare the payload for the API
    const payload = {
      item: item.item, // Assuming the item identifier is in the "item" property
      currentStock: String(item['Current Stock']), // Ensure the stock is a number
    };
      // Call the API service to update the item
    this.apiService.updateInventory(payload).subscribe(
      response => {
      console.log('Stock updated successfully:', response);
      item.isEditing = false; // Exit edit mode on success
      window.location.reload();
      },
      error => {
      console.error('Error updating stock:', error);
      // alert('Failed to update stock. Please try again.');
      window.location.reload();
      }
  );
    // Additional logic can go here, such as calling a service to save the updated stock
    item.isEditing = false;
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