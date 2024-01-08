from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import ai
import uvicorn

# AI Portion: React -> Java Backend -> Python Backend
# Account Portion: React Public Page -> Firebase Auth (userid) -> React Profile Page -> Java Backend -> AWS Database
# Website hosted with AWS Lightsail or EC2

# TODO:
# Must Do:
# Frontend:
# Connect to the AWS Services
# Finish the Search Page
# Host on Free Service: https://gist.github.com/picwellwisher12pk/80bc71b7719b2c06115b84c052ffd6b7
#
# Backend:
# Use AWS Lambda for Python and Java Backend
# Create Lambdas for every Python function
# Create Lambdas for every Java function
#
# Nice to Have Features:
# Make it mobile friendly
# Handle blacklist VNs
# Handle AI algorithm auto refreshing

DB_LOCATION = "../../fetched.db"

app = FastAPI()

origins = [
    'http://localhost',
    'http://localhost:5173'
]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )

@app.get("/recommend/")
async def recommend(userid: int,
                    language_filters: list[str] = Query(None),
                    platform_filters: list[str] = Query(None)) -> list[tuple]:
    if len(language_filters) == 1 and not language_filters[0]:
        language_filters = None
    if len(platform_filters) == 1 and not platform_filters[0]:
        platform_filters = None

    database = sqlite3.connect(DB_LOCATION)
    result = ai.recommend(database, userid, language_filters, platform_filters)
    database.close()
    print(result)
    return result


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
