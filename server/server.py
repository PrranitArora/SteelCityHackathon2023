from flask import Flask, jsonify, request
from sentiment_analysis import Analyzer

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    analyzer = Analyzer()

    @app.route('/score', methods=['POST'])
    def rate_video():
        sentiment = analyzer.sentiment(request.json["caption"])
        return sentiment, 200
    
    return app