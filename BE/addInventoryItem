import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('inventory')  # Replace with your DynamoDB table name

def lambda_handler(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])
        item = body.get('item')
        unit = body.get('unit')
        min_stock = body.get('minStock')
        current_stock = body.get('currentStock')

        # Validate the input
        if not item or not unit or min_stock is None:
            return {
            'statusCode': 400,
            'headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': json.dumps({"error": "Missing required fields: item, unit, minStock"})
            }

        # Prepare the item to be inserted
        data = {
            'item': item,
            'Unit': unit,
            'Min. Stock': str(min_stock),  # Convert min_stock to integer
            'Current Stock': str(current_stock)
        }

        # Insert the item into the DynamoDB table
        table.put_item(Item=data)

        # Return success response
        return {
            'statusCode': 200,
            'headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': json.dumps({"message": "Item added successfully", "item": data})
        }

    except Exception as e:
        # Handle unexpected errors
        return {
            'statusCode': 500,
            'headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            'body': json.dumps({"error": str(e)})
        }
