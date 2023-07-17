from fastapi import FastAPI, Query
import sqlite3
import ai
import uvicorn

# AI Portion: React -> Java Backend -> Python Backend
# Account Portion: React Public Page -> Firebase Auth (userid) -> React Profile Page -> Java Backend -> AWS Database
# Website hosted with AWS Lightsail or EC2

# TODO:
# Have Java server handle user account creations and fetching
# Complete minimum react frontend UI
# Configure security and authentication
# Upload to a server and have publicly accessible
# ----------
# Handle blacklist VNs
# Handle AI algorithm auto refreshing
# Complete full react frontend UI - delete account

DB_LOCATION = "../../fetched.db"

app = FastAPI()


@app.get("/recommend/")
async def recommend(userid: int,
                    language_filters: list[str] = Query(None),
                    platform_filters: list[str] = Query(None)) -> list[tuple]:
    database = sqlite3.connect(DB_LOCATION)
    result = ai.recommend(database, userid, language_filters, platform_filters)
    database.close()
    return result


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
