from fastapi import FastAPI, Query
import sqlite3
import ai
import uvicorn

app = FastAPI()


@app.get("/recommend/")
async def recommend(userid: int,
                    language_filters: list[str] = Query(None),
                    platform_filters: list[str] = Query(None)) -> list[tuple]:
    database = sqlite3.connect("../../dump/fetched2.db")
    result = ai.recommend(database, userid, language_filters, platform_filters)
    database.close()
    return result


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
