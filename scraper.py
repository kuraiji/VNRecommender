import os
import sqlite3
import time
import requests
import json


def scan_user_account(uid: int):
    print(f"Now scanning the VNDB profile of u{uid}")
    results = []
    counter = 1
    while True:
        data = {"user": f"u{uid}",
                "fields": "id, vote, vn.title, labels.label, vn.titles.lang, vn.platforms",
                "sort": "id",
                "results": 75,
                "page": counter}
        response = requests.post(api_url, data=json.dumps(data), headers=header)
        try:
            results.extend(response.json()['results'])
        except requests.exceptions.JSONDecodeError:
            print(f"JSON Decode Error at u{uid}")
            print(response)
        counter = counter + 1
        time.sleep(4)
        if not response.json()['more']:
            break

    for x, vn in enumerate(results):
        title = str.replace(vn["vn"]["title"], '\'', '\'\'')
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
        if score > 0:
            cur.execute(f"INSERT OR IGNORE INTO Ratings VALUES({uid}, {vnid}, {score})")
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


try:
    #os.remove("fetched.db")
    print("")
except FileNotFoundError:
    print("Creating new DB File")
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
cur.execute("CREATE TABLE IF NOT EXISTS Ratings (UID INT unsigned NOT NULL, VNID INT unsigned NOT NULL, "
            "Score INT unsigned NOT NULL, UNIQUE(UID, VNID))")
res = cur.execute("SELECT name FROM sqlite_master")

api_url = "https://api.vndb.org/kana/ulist"
header = {"Content-Type": "application/json"}
for userid in [17124, 14919, 236735]:
    while True:
        try:
            scan_user_account(userid)
        except Exception as e:
            print(e)
            time.sleep(10)
        break

db.close()
