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
    # first document in the collection
    # first_record = mongo.db.streamHorizontal.find_one()

    return render_template("index.html")


# after the source file is where the {{variable}} from the html is being set to


@app.route("/wheel")
def wheel():
    return render_template("wheel.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/get_horizontal")
def get_horizontal():
    # variable to find all data in streamData collection
    mongo_horizontal = mongo.db.streamHorizontal.find()
    # empty list to be transformed into json object
    json_horizontal = {}
    for all in mongo_horizontal:
        json_horizontal.update(all)
    # remove mongo created id
    del json_horizontal["_id"]
    # converting mongo encoding to json
    json_horizontal = json.dumps(json_horizontal, default=json_util.default)
    return json_horizontal


@app.route("/get_vertical")
def get_vertical():
    # variable to find all data in streamData collection
    mongo_vertical = mongo.db.streamVertical.find()
    # empty list to be transformed into json object
    json_vertical = {}
    for all in mongo_vertical:
        json_vertical.update(all)
    # remove mongo created id
    del json_vertical["_id"]
    # converting mongo encoding to json
    json_vertical = json.dumps(json_vertical, default=json_util.default)
    return json_vertical


@app.route("/get_sunburst")
def get_sunburst():
    # variable to find all data in streamData collection
    mongo_vertical = mongo.db.streamSunburst.find({}, {"_id": 0})
    # empty list to be transformed into json object
    json_sunburst = []
    for all in mongo_vertical:
        json_sunburst.append(all)
    # remove mongo created id
    # del json_vertical["_id"]
    # converting mongo encoding to json
    json_sunburst = json.dumps(json_sunburst, default=json_util.default)
    return json_sunburst


# run webpage
# set debug to True if you want server to auto reload code changes
# and will show interactive debugger in browser if error occurs
if __name__ == "__main__":
    app.run(debug=True)
