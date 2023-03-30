import pymongo
import pandas as pd
import json

# connection using pymongo
client = pymongo.MongoClient("mongodb://localhost:27017")

# read in csv file as dataframe
df = pd.read_csv("merged.csv")

# rename columns to 1 word strings for proper mongo keys
df = df.rename(columns={"Rotten Tomatoes Score": "Score",
                        "Date Added": "Added",
                        "Release Year": "Release",
                        })

# new variable of df that converts data to dictionary
# where each row is its own dictionary (orient="records")
# list of dictionaries
data = df.to_dict(orient="records")

# connect to db, one will be created if it does not exist yet
db = client["streamTest"]

# connect to collection and drop if it exists
mycol = db["streamData"]
mycol.drop()

# create streamData collection and insert data
db.streamData.insert_many(data)