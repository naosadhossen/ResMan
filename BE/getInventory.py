import json
import boto3
# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('inventory')


def lambda_handler(event, context):
    try:
        # Perform the scan operation to get all items
        response = table.scan()
        
        # Extract the items from the response
        items = response.get('Items', [])
        
        # Return the items in the response
        return {
            'statusCode': 200,
            'headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': json.dumps(items)
        }
    except Exception as e:
        print("Error retrieving items from DynamoDB:", e)
        
        # Return an error response if something goes wrong
        return {
            'statusCode': 500,
            'headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': json.dumps({
                'message': 'Could not retrieve items from DynamoDB',
                'error': str(e)
            })
        }
