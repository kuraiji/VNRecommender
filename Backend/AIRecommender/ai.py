import sqlite3
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans
from surprise import SVD
from surprise import SVDpp
from surprise.model_selection import GridSearchCV
from collections import defaultdict


# userid: int, platforms: list[str], languages: list[str]

#KNNWithMeans
#1.3634611521369024
#{'sim_options': {'name': 'msd', 'min_support': 3, 'user_based': False}}

#SVD
#1.3822847088267212
#{'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

#SVD++
#1.3808324020586962
#{'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

def get_top_n(predictions, n=10):
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid,est))
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    print(top_n)
    return top_n


def recommend_novels(user_id: int):
    db = sqlite3.connect("../../dump/fetched2.db")
    df = pd.read_sql_query("SELECT * FROM Ratings", db)
    reader = Reader(rating_scale=(1, 10))
    data = Dataset.load_from_df(df[["UID", "VNID", "Score"]], reader)
    algo = SVDpp()
    training_set = data.build_full_trainset()
    algo.fit(training_set)

    anti_set = training_set.build_anti_testset()
    predictions = algo.test(anti_set)

    return get_top_n(predictions, n=10)


recommend_novels(2)
