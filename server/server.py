from flask import Flask, jsonify, request, make_response
from sentiment_analysis import Analyzer
from youtube_transcript_api import YouTubeTranscriptApi

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    analyzer = Analyzer()
    print("IN");
    
    @app.route('/score', methods=["POST", "OPTIONS"])
    def rate_video():
        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
        elif request.method == "POST": # The actual request following the preflight
            try:
                # sentiment = analyzer.sentiment(request.json["id"])
                print(request.get_json()["id"]);
                
                captionStr = "";
                for i in YouTubeTranscriptApi.get_transcript(request.get_json()["id"]):
                    captionStr += i["text"] + " ";
                    
                print(captionStr);
                sentiment = analyzer.sentiment(captionStr)
                print(sentiment)
                response = make_response(sentiment, 200);
                response.headers.add("Access-Control-Allow-Origin", "*");
                return response;
            except:
                response = make_response();
                response.headers.add("Access-Control-Allow-Origin", "*");
                response.status = 500;
                return response;
        
    def _build_cors_preflight_response():
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response
    
    return app

if __name__ == '__main__':
    create_app().run(host="localhost", port=8000, debug=True)