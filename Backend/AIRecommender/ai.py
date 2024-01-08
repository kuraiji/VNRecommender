import sqlite3
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import SVDpp
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent
MODEL_NAME = "Model.joblib"
DB_LOCATION = "../../fetched.db"

def train(db: sqlite3.Connection) -> SVDpp:
    df = pd.read_sql_query("SELECT * FROM Ratings", db)
    reader = Reader(rating_scale=(1, 10))
    data = Dataset.load_from_df(df[["UID", "VNID", "Score"]], reader)
    algo = SVDpp(verbose=True)
    training_set = data.build_full_trainset()
    algo.fit(training_set)
    joblib.dump(algo, Path(BASE_DIR).joinpath(MODEL_NAME))
    return algo


def recommend(db: sqlite3.Connection, user_id: int,
              language_filters: list[str] = None, platform_filters: list[str] = None) -> list[tuple]:
    list_of_vns = pd.read_sql_query(
        "SELECT * FROM VisualNovels LEFT JOIN VisualNovelLanguages ON VisualNovels.VNID=VisualNovelLanguages.VNID "
        "LEFT JOIN VisualNovelPlatforms ON VisualNovels.VNID=VisualNovelPlatforms.VNID", db)
    filtered_list_of_vns = list_of_vns

    if platform_filters is not None and len(platform_filters) > 0:
        filtered_list_of_vns = filtered_list_of_vns[filtered_list_of_vns["Platform"].isin(platform_filters)]
    if language_filters is not None and len(language_filters) > 0:
        filtered_list_of_vns = filtered_list_of_vns[filtered_list_of_vns["Language"].isin(language_filters)]
    print(filtered_list_of_vns)
    filtered_list_of_vns = filtered_list_of_vns.iloc[:, 0].drop_duplicates()
    dictionary = dict()

    model_file = Path(BASE_DIR).joinpath(MODEL_NAME)
    algo = joblib.load(model_file)

    for index, row in filtered_list_of_vns.items():
        prediction = algo.predict(user_id, row)
        dictionary[row] = prediction.est

    top_results = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)[:10]

    return top_results


if __name__ == "__main__":
    database = sqlite3.connect(DB_LOCATION)
    #model = train(database)
    #results = recommend(database, 2, ["ja"], ["win"])
    #print(results)
    database.close()
