import boto3
import json
import random
from botocore.exceptions import ClientError

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table_name = "Accounts"

def lambda_handler(event, context):
    # Define the table
    table = dynamodb.Table(table_name)

    verification_code = random.randint(100000, 999999)

    # Example data to add (from event data)
    item = {
        'AccountID': event['AccountID'],
        'FirstName': event['FirstName'],
        'LastName': event['LastName'],
        'Email': event['Email'],
        'EmailVerification': 0,
        'VerificationCode': verification_code,
    }

    # Try to add the item to the table
    try:
        response = table.put_item(Item=item)
        send_individual_verification_code(event['Email'], verification_code)
        return {
            'statusCode': 200,
            'body': json.dumps('Item added successfully')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error adding item: {e.response['Error']['Message']}")
        }

def send_individual_verification_code(email_address, verification_code):
    
    sns_client = boto3.client('sns')

    # Generate a unique topic name for the user
    topic_name = f"VerificationTopic_{verification_code}"
    topic_arn = sns_client.create_topic(Name=topic_name)['TopicArn']

    # Subscribe the user's email
    sns_client.subscribe(
        TopicArn=topic_arn, 
        Protocol='email', 
        Endpoint=email_address
    )

    # Generate and send the verification code
    message = f"Your verification code is: {verification_code}"
    sns_client.publish(
        TopicArn=topic_arn, 
        Message=message, 
        Subject="Your Verification Code"
    )

    # Clean up by deleting the topic after use (optional)
    sns_client.delete_topic(TopicArn=topic_arn)