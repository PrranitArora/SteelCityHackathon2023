from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/score', methods=['POST'])
def rate_video():
    print(request.get_data())
    #do_something
    return '', 200