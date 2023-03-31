from flask import Flask, render_template, url_for
from flask_pymongo import PyMongo
import json
from bson import json_util
from bson.json_util import dumps
import create_mongodb

# create instance of Flask class
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/streamTest"
mongo = PyMongo(app)

# define how we get to page with app.route
@app.route("/")
# what will be displayed on pg wrapped in this function
def home():
    create_mongodb.create_db()
    #first document in the collection
    first_record = mongo.db.streamData.find_one()
    return render_template("index.html", first_record=first_record)
# after the source file is where the {{variable}} from the html is being set to

@app.route("/get_data")
def get_data():
    # variable to find all data in streamData collection
    mongo_all = mongo.db.streamData.find()
    #empty list to be transformed into json object
    json_all = []
    for all in mongo_all:
        json_all.append(all)
    # converting mongo encoding to json
    json_all = json.dumps(json_all, default=json_util.default)
    return json_all

# run webpage
# set debug to True if you want server to auto reload code changes
# and will show interactive debugger in browser if error occurs
if __name__ == "__main__":
    app.run(debug= True)