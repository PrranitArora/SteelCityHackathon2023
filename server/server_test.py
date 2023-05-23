import requests

url = "http://127.0.0.1:5000/score"
while True:
    text = input("Enter a phrase:\n")
    if text == "0":
        break
    response = requests.post(url, json={"caption": text})
    print("negative" if response.json() < 0.5 else "positive")