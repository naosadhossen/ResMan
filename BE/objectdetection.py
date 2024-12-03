import json
import boto3
import base64

rekognition_client = boto3.client('rekognition', region_name='eu-central-1')

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    
    try:
        # Assuming 'image' is passed in the event body as base64 encoded data (without the prefix)
        image_data = json.loads(event['body']).get('image')

        # Decode the base64 image data
        image_bytes = base64.b64decode(image_data)  # Decode base64 string to bytes
        
        # Call Rekognition DetectLabels API
        response = rekognition_client.detect_labels(
            Image={
                'Bytes': image_bytes  # Pass the decoded image bytes
            },
            MaxLabels=10,
            MinConfidence=70
        )

        # Get detected objects (labels)
        detected_objects = response.get('Labels', [])
        
        # Extract the names of the detected objects
        object_names = [label['Name'] for label in detected_objects]
        total_objects = len(object_names)

        # Return the object names and count with CORS headers
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'detectedObjects': object_names,  # Only names of detected objects
                'totalObjects': total_objects     # Total number of detected objects
            })
        }

    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': str(e)
            })
        }
