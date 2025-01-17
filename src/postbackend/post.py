from flask import Flask, request, jsonify
from flask_cors import CORS
import tweepy
import os
import sys
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Twitter API credentials
API_KEY = "5q8CrLdKKYkpXfroQmo2cHaET"
API_SECRET = "5tZu3q4T60sRGSTD6kfdXKLyo9iRtE1mMhOt0gH5yk7C2SP0Na"
ACCESS_TOKEN = "1880122259378962432-EcSUVQmc0MbSC4VGqZKKj0Z5ARTCZ0"
ACCESS_TOKEN_SECRET = "PqKAQJ7j501GaaANFgw4lIa1tXg4Zca1PDdkm53dLX5bt"

# Configure upload folder
UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def post_tweet_with_image(text, image_path):
    try:
        # Set up Twitter authentication
        auth = tweepy.OAuth1UserHandler(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)
        client = tweepy.Client(
            consumer_key=API_KEY, 
            consumer_secret=API_SECRET,
            access_token=ACCESS_TOKEN, 
            access_token_secret=ACCESS_TOKEN_SECRET,
            wait_on_rate_limit=True
        )

        # Upload media
        media = api.media_upload(filename=image_path)
        
        # Post tweet
        response = client.create_tweet(
            text=text,
            media_ids=[media.media_id]
        )

        return {"success": True, "tweet_id": response.data['id']}

    except Exception as e:
        return {"success": False, "error": str(e)}

@app.route('/api/tweet', methods=['POST'])
def create_tweet():
    try:
        if 'image' not in request.files:
            return jsonify({"message": "No image provided"}), 400
        
        image = request.files['image']
        text = request.form.get('text', '')

        if not text:
            return jsonify({"message": "No text provided"}), 400

        if image.filename == '':
            return jsonify({"message": "No image selected"}), 400

        # Save the image temporarily
        filename = secure_filename(image.filename)
        temp_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(temp_path)

        # Post the tweet
        result = post_tweet_with_image(text, temp_path)

        # Clean up the temporary file
        os.remove(temp_path)

        if result["success"]:
            return jsonify({
                "message": "Tweet posted successfully!",
                "tweet_id": result["tweet_id"]
            }), 200
        else:
            return jsonify({
                "message": f"Error posting tweet: {result['error']}"
            }), 400

    except Exception as e:
        return jsonify({
            "message": f"Server error: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)