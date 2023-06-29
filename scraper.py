import os
import sqlite3
import time
import requests
import json


# TODO:
# Work on Heatmap Algorithm

def scan_user_account(uid: int):
    print(f"Now scanning the VNDB profile of u{uid}")
    results = []
    counter = 1
    while True:
        data = {"user": f"u{uid}",
                "fields": "id, vote, vn.title, labels.label, vn.titles.lang, vn.platforms",
                "sort": "id",
                "results": 100,
                "page": counter}
        response = requests.post(api_url, data=json.dumps(data), headers=header)
        results.extend(response.json()['results'])
        counter = counter + 1
        if not response.json()['more']:
            break
        time.sleep(1.6)

    for x, vn in enumerate(results):
        title = vn["vn"]["title"]
        vnid = int(vn["id"][1:])
        try:
            score = vn["vote"] / 10
        except TypeError:
            score = 0
        platforms = vn["vn"]["platforms"]
        languages = vn["vn"]["titles"]
        try:
            cur.execute(f"INSERT OR IGNORE INTO VisualNovels VALUES({vnid}, \"{title}\")")
        except sqlite3.OperationalError:
            cur.execute(f"INSERT OR IGNORE INTO VisualNovels VALUES({vnid}, \'{title}\')")
        for lang in languages:
            cur.execute(f"INSERT OR IGNORE INTO VisualNovelLanguages VALUES({vnid}, \"{lang['lang']}\")")
        for platform in platforms:
            cur.execute(f"INSERT OR IGNORE INTO VisualNovelPlatforms VALUES({vnid}, \"{platform}\")")
        if x + 1 != len(results):
            for index in range(x + 1, len(results)):
                other_id = int(results[index]["id"][1:])
                try:
                    other_score = results[index]["vote"] / 10
                except TypeError:
                    other_score = 0
                try:
                    cur.execute(f"INSERT INTO HeatMap VALUES({vnid if vnid < other_id else other_id}, "
                                f"{vnid if vnid > other_id else other_id}, "
                                f"{score + other_score if score != 0 and other_score != 0 else 0})")
                except sqlite3.IntegrityError:
                    cur.execute(f"UPDATE HeatMap SET Score = Score + "
                                f"{score + other_score if score != 0 and other_score != 0 else 0} "
                                f"WHERE LowVNID = {vnid if vnid < other_id else other_id} "
                                f"AND HighVNID = {vnid if vnid > other_id else other_id}")
        db.commit()


os.remove("fetched.db")
db = sqlite3.connect("fetched.db")
cur = db.cursor()
cur.execute(
    "CREATE TABLE IF NOT EXISTS VisualNovels (VNID INT unsigned NOT NULL, Name VARCHAR(100) NOT NULL, PRIMARY KEY ("
    "VNID));")
cur.execute(
    "CREATE TABLE IF NOT EXISTS HeatMap (LowVNID INT unsigned NOT NULL, HighVNID INT unsigned NOT NULL, Score INT "
    "zerofill NOT NULL, PRIMARY KEY (LowVNID,HighVNID));")
cur.execute(
    "CREATE TABLE IF NOT EXISTS VisualNovelLanguages (VNID INT NOT NULL, Language VARCHAR(50) NOT NULL, UNIQUE(VNID, "
    "Language));")
cur.execute(
    "CREATE TABLE IF NOT EXISTS VisualNovelPlatforms (VNID INT NOT NULL, Platform VARCHAR(50) NOT NULL, UNIQUE(VNID, "
    "Platform));")
res = cur.execute("SELECT name FROM sqlite_master")

api_url = "https://api.vndb.org/kana/ulist"
header = {"Content-Type": "application/json"}
for userid in range(2, 51):
    scan_user_account(userid)
db.close()
