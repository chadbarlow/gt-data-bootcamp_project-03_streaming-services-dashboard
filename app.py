#import flask class
# import render_template (allows flask server to read in html for display in browser)
#need the following structure of folders
#   - app.py
#   - templates (dir)
#       > index.html
from flask import Flask, render_template, url_for
from flask_pymongo import PyMongo

# create instance of Flask class
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/streamTest"
mongo = PyMongo(app)

# define how we get to page with app.route
@app.route("/")
# what will be displayed on pg wrapped in this function
def home():
    #first document in the collection
    first_record = mongo.db.streamData.find_one()
    return render_template("index.html", first_record=first_record)
# after the source file is where the {{variable}} from the html is being set to

# run webpage
# set debug to True if you want server to auto reload code changes
# and will show interactive debugger in browser if error occurs
if __name__ == "__main__":
    app.run(debug= True)