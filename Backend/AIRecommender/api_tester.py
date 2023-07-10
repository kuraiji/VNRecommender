import requests

url = "http://0.0.0.0:8000/recommend/"
url2 = "http://localhost:8080/recommend"

payload = {
    "userid": 2,
    "language_filters": ["en"],
    "platform_filters": ["win"]
}

response = requests.request("GET", url2, headers={}, params=payload)
print(response.json())
