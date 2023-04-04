import pymongo
import pandas as pd
import json

def create_db():

    # connection using pymongo
    client = pymongo.MongoClient("mongodb://localhost:27017")

    # read in csv file as dataframe
    df_horizontal = pd.read_csv("static/etl/csv/complete_data/complete_horizontal.csv")
    df_vertical = pd.read_csv("static/etl/csv/complete_data/complete_vertical.csv")

    # map index to string for bson compatibility
    df_horizontal.index = df_horizontal.index.map(str)
    df_vertical.index = df_vertical.index.map(str)

    # new variable of df that converts data to dictionary
    # where each row is its own dictionary (orient="records")
    # list of dictionaries
    data_horizontal = df_horizontal.to_dict(orient="index")
    data_vertical = df_vertical.to_dict(orient="index")

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
    db.streamHorizontal.insert_one(data_horizontal)

    db.streamVertical.insert_one(data_vertical)