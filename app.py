#import flask class
# import render_template (allows flask server to read in html for display in browser)
#need the following structure of folders
#   - app.py
#   - templates (dir)
#       > index.html
from flask import Flask, render_template, url_for

# create instance of Flask class
app = Flask(__name__)

# define how we get to page with app.route
@app.route("/")
# what will be displayed on pg wrapped in this function
def home():
    return render_template("index.html")
# after the source file is where the {{variable}} from the html is being set to

# run webpage
# set debug to True if you want server to auto reload code changes
# and will show interactive debugger in browser if error occurs
if __name__ == "__main__":
    app.run(debug= True)