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

# KNNWithMeans
# 1.3634611521369024
# {'sim_options': {'name': 'msd', 'min_support': 3, 'user_based': False}}

# SVD
# 1.3822847088267212
# {'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

# SVD++
# 1.3808324020586962
# {'n_epochs': 10, 'lr_all': 0.005, 'reg_all': 0.4}

def get_top_n(predictions, n=10):
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]
    return top_n


def recommend_novels(user_id: int, language_filters: list[str] = None, platform_filters: list[str] = None):
    db = sqlite3.connect("../../dump/fetched2.db")

    list_of_vns = pd.read_sql_query("SELECT VNID FROM VisualNovels", db)
    list_of_read_vns = pd.read_sql_query(f"SELECT VNID FROM Ratings WHERE UID == {user_id}", db)

    request = "SELECT DISTINCT VisualNovels.VNID FROM VisualNovels LEFT JOIN VisualNovelPlatforms ON VisualNovels.VNID = " \
              "VisualNovelPlatforms.VNID LEFT JOIN VisualNovelLanguages ON VisualNovels.VNID = " \
              "VisualNovelLanguages.VNID"

    #TODO: Fix Table

    if language_filters is not None or platform_filters is not None:
        request += " WHERE"
        lan_added = False
        if len(language_filters) > 0:
            lan_added = True
            once = False
            request += " Language ="
            for lan_filter in language_filters:
                if once:
                    request += " OR Language ="
                request += f" \"{lan_filter}\""
                once = True
        if len(platform_filters) > 0:
            if lan_added:
                request += " AND"
            request += " Platform ="
            once = False
            for plat_filter in platform_filters:
                if once:
                    request += " OR Platform ="
                request += f" \"{plat_filter}\""
                once = True

    filtered_vn_list = pd.read_sql_query(request, db)
    print(request)
    print(filtered_vn_list)

    list_of_unread_vns = list_of_vns.merge(list_of_read_vns.drop_duplicates(), on=['VNID'], how='left', indicator=True)
    list_of_unread_vns = list_of_unread_vns[list_of_unread_vns['_merge'] == 'left_only']["VNID"]

    df = pd.read_sql_query("SELECT * FROM Ratings", db)
    reader = Reader(rating_scale=(1, 10))
    data = Dataset.load_from_df(df[["UID", "VNID", "Score"]], reader)
    algo = SVDpp(verbose=True)
    training_set = data.build_full_trainset()
    algo.fit(training_set)

    dictionary = dict()

    for index, row in list_of_unread_vns.items():
        prediction = algo.predict(user_id, row)
        dictionary[row] = prediction.est

    top_results = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)[:10]

    return top_results


recommend_novels(2, ["en", "jp"], ["ps5"])

# "SELECT DISTINCT * "
# "FROM VisualNovels "
#  "LEFT JOIN VisualNovelPlatforms "
#   "ON VisualNovels.VNID = VisualNovelPlatforms.VNID "
#    "LEFT JOIN VisualNovelLanguages "
#     "ON VisualNovels.VNID = VisualNovelLanguages.VNID "
#     "WHERE Language = \"en\" AND Platform = \"win\""
