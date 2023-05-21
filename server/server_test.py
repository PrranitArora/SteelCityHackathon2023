import requests

url = "http://127.0.0.1:5000/score"
requests.post(url, data={"caption": "abc"})