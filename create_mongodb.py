import pymongo
import pandas as pd
import json

def create_db():

    # connection using pymongo
    client = pymongo.MongoClient("mongodb://localhost:27017")

    # read in csv file as dataframe
    df_horizontal = pd.read_csv("static/etl/csv/complete_horizontal.csv")
    df_vertical = pd.read_csv("static/etl/csv/complete_vertical.csv")

    # rename columns to 1 word strings for proper mongo keys
    # df = df.rename(columns={"Rotten Tomatoes Score": "Score",
    #                         "Date Added": "Added",
    #                         "Release Year": "Release",
    #                         })

    # new variable of df that converts data to dictionary
    # where each row is its own dictionary (orient="records")
    # list of dictionaries
    data_horizontal = df_horizontal.to_dict(orient="records")
    data_vertical = df_vertical.to_dict(orient="records")

    # connect to db, one will be created if it does not exist yet
    db = client["streamTest"]

    # connect to collection and drop if it exists
    mycol = db["streamData"]
    mycol.drop()

    horCol = db["streamHorizontal"]
    horCol.drop()

    vertCol = db["streamVertical"]
    vertCol.drop()

    # create streamData collection and insert data
    # db.streamData.insert_many(data)
    db.streamHorizontal.insert_many(data_horizontal)

    db.streamVertical.insert_many(data_vertical)