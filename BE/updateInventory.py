import boto3
import json
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table_name = 'inventory'  # Replace with your table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        # Parse the incoming request body
        body = json.loads(event['body'])
        item = body['item']  # Item key
        current_stock = body['currentStock']  # Current Stock value

        # Get the current timestamp
        last_update_date = datetime.utcnow().isoformat()

        # Update DynamoDB
        response = table.update_item(
            Key={'item': item},  # Replace with your table's key schema
            UpdateExpression='SET #cs = :cs, #ud = :ud',
            ExpressionAttributeNames={
                '#cs': 'Current Stock',
                '#ud': 'Last Update Date(UTC)'
            },
            ExpressionAttributeValues={
                ':cs': current_stock,
                ':ud': last_update_date
            },
            ReturnValues='UPDATED_NEW'
        )

        # Return success response
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({
                'message': 'Update successful',
                'updatedAttributes': response['Attributes']
            })
        }
    except KeyError as e:
        # Handle missing keys in the request
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({'error': f'Missing key: {str(e)}'})
        }
    except Exception as e:
        # Handle unexpected errors
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': json.dumps({'error': str(e)})
        }
