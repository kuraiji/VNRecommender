import sqlite3

import pandas
import pandas as pd
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans
from surprise import SVD
from surprise import SVDpp
from surprise.model_selection import GridSearchCV
from collections import defaultdict


# userid: int, platforms: list[str], languages: list[str]

# KNNWithMeans
# 1.3634611521369024
# {'sim_options': {'name': 'msd', 'min_support': 3, 'user_based': False}}

# SVD
# 1.3822847088267212
# {'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

# SVD++
# 1.3808324020586962
# {'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

def train():


def recommend_novels(user_id: int, language_filters: list[str] = None, platform_filters: list[str] = None):
    db = sqlite3.connect("../../dump/fetched2.db")

    list_of_vns = pd.read_sql_query(
        "SELECT * FROM VisualNovels LEFT JOIN VisualNovelLanguages ON VisualNovels.VNID=VisualNovelLanguages.VNID "
        "LEFT JOIN VisualNovelPlatforms ON VisualNovels.VNID=VisualNovelPlatforms.VNID", db)

    filtered_list_of_vns = list_of_vns
    if platform_filters is not None:
        filtered_list_of_vns = filtered_list_of_vns[filtered_list_of_vns["Platform"].isin(platform_filters)]
    if language_filters is not None:
        filtered_list_of_vns = filtered_list_of_vns[filtered_list_of_vns["Language"].isin(language_filters)]
    filtered_list_of_vns = filtered_list_of_vns.iloc[:, 0].drop_duplicates()

    df = pd.read_sql_query("SELECT * FROM Ratings", db)
    reader = Reader(rating_scale=(1, 10))
    data = Dataset.load_from_df(df[["UID", "VNID", "Score"]], reader)
    algo = SVDpp(verbose=True)
    training_set = data.build_full_trainset()
    algo.fit(training_set)

    dictionary = dict()

    for index, row in filtered_list_of_vns.items():
        prediction = algo.predict(user_id, row)
        dictionary[row] = prediction.est

    top_results = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)[:10]

    return top_results


results = recommend_novels(2, ["ja"], ["win"])
print(results)

# "SELECT DISTINCT * "
# "FROM VisualNovels "
#  "LEFT JOIN VisualNovelPlatforms "
#   "ON VisualNovels.VNID = VisualNovelPlatforms.VNID "
#    "LEFT JOIN VisualNovelLanguages "
#     "ON VisualNovels.VNID = VisualNovelLanguages.VNID "
#     "WHERE Language = \"en\" AND Platform = \"win\""
# list_of_vns = pd.read_sql_query("SELECT VNID FROM VisualNovels", db)
# list_of_read_vns = pd.read_sql_query(f"SELECT VNID FROM Ratings WHERE UID == {user_id}", db)
# list_of_unread_vns = list_of_vns.merge(list_of_read_vns.drop_duplicates(), on=['VNID'], how='left', indicator=True)
# list_of_unread_vns = list_of_unread_vns[list_of_unread_vns['_merge'] == 'left_only']["VNID"]
# test = list_of_vns[list_of_vns["Platform"].isin(platform_filters)][list_of_vns["Language"].isin(language_filters)].iloc[:, 0].drop_duplicates().sort_values()
