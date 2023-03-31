# d3.json is a get request and fetches the json file at specified url
# so need to make mongo data into json and serve to url

# mongodb data is in BSON format
    # BSON is binary JSON or binary encoded serialization of JSON like documents
    # need to convert mongodb data from BSON to JSON
        # - use BSON package which is already part of PyMongo
        # - DO NOT install bson package separate from PyMongo
        # - json.dumps(..., default=json_util.default)
    # must import
        # - import json
        # - from bson import json_util
        # - from bson.json_util import dumps