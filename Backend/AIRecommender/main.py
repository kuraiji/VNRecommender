from ai import recommend_novels
from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get("/{user_id}")
def recommend_vn(user_id: int) -> float:
    return recommend_novels(user_id)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
