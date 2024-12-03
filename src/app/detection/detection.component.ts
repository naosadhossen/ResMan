import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;   // Reference to video element
  @ViewChild('canvasElement') canvasElement: any; // Reference to canvas element
  capturedImage: string | null = null;             // Store the captured image
  detectedObjects: any = null;                     // Store detected objects and counts
  totalObjects: number = 0;                        // Store the total number of detected objects

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setupCamera();
  }

  // Set up the camera feed using getUserMedia
  setupCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Set the video element's source to the webcam stream
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch(error => {
          console.error('Error accessing the camera:', error);
        });
    } else {
      console.error('Camera is not supported on this device.');
    }
  }

  // Capture the image from the video stream and show it on canvas
  captureImage() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;

    // Set canvas dimensions to match the video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video feed onto the canvas
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL (base64 image)
    this.capturedImage = canvas.toDataURL('image/jpeg');

    // Debugging: Log the base64 string to the console
    console.log('Captured Image Base64:', this.capturedImage);  // Check the output in browser's console
  }

  // Send image to API Gateway for object detection
  sendImageToLambda() {
    if (this.capturedImage) {
      const base64Data = this.capturedImage.split(',')[1];;  // Remove the base64 prefix

      // Debugging: Log the base64 string being sent to the Lambda
      console.log('Sending Base64 Image Data:', base64Data);  // Check the data sent to the API

      const body = { 
        image: base64Data // Send only the base64 data (without prefix)
      };

      // Send image data to Lambda via API Gateway
      this.http.post('https://l8ty3pjj97.execute-api.eu-north-1.amazonaws.com/prd/objectdetection', body)
        .subscribe((response: any) => {
          this.detectedObjects = response.detectedObjects;
          this.totalObjects = response.totalObjects;
          console.log('Detected Objects:', this.detectedObjects);
          console.log('Total Objects:', this.totalObjects);
        }, error => {
          console.error('Error sending image:', error);
        });
    }
  }

  // Helper method to get the keys of the detected objects
  objectKeys() {
    return Object.keys(this.detectedObjects || {});
  }
}
