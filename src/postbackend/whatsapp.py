from twilio.rest import Client
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Twilio credentials
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')

class CustomerMessenger:
    def __init__(self):
        self.client = Client(account_sid, auth_token)

    
    def send_reminder(self, customer_phone, message):
        """
        Send a reminder message to a customer
        
        Args:
            customer_phone (str): Customer's phone number including country code (e.g., '+1234567890')
            message (str): The reminder message to send
            
        Returns:
            dict: Contains status ('success' or 'error') and additional info (message sid or error message)
        """
        try:
            message_response = self.client.messages.create(
                body=message,
                from_=f"whatsapp:{twilio_phone_number}",
                to=f"whatsapp:{customer_phone}"
            )
            return {
                'status': 'success',
                'message_sid': message_response.sid,
                'body': message_response.body
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }


   

# Example usage
if __name__ == "__main__":
    messenger = CustomerMessenger()
    
    # Single reminder example
    result = messenger.send_reminder(
        '+919892722870',
        'Hello! This is a reminder about your upcoming appointment tomorrow at 2 PM.'
    )
    print("Message Result:", result)
    
    # Bulk reminder example
    customers = ['+919892722870', '+918828427752','+919004552506']
    for customer in customers:
        result = messenger.send_reminder(
            customer,
            'Don\'t forget about our special promotion ending this weekend!'
        )
        print(f"Message to {customer}:", result)