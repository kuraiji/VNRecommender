import sqlite3
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans


# userid: int, platforms: list[str], languages: list[str]

def recommend_novels():
    db = sqlite3.connect("fetched.db")
    df = pd.read_sql_query("SELECT * FROM Ratings", db)
    reader = Reader(rating_scale=(1, 10))

    data = Dataset.load_from_df(df[["UID", "VNID", "Score"]], reader)
    sim_options = {
        "name": "cosine",
        "user_based": True
    }
    algo = KNNWithMeans(sim_options=sim_options)
    training_set = data.build_full_trainset()
    algo.fit(training_set)
    prediction = algo.predict(62, 4)
    print(prediction.est)


recommend_novels()
