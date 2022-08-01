from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/get_location_names')
def get_location_name():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    content = request.json
    print(content)


    # total_sqft = float(request.form['total_sqft'])
    # location = request.form['location']
    # bath = int(request.form['bath'])
    # bhk = int(request.form['bhk'])

    response = jsonify({
        'estimated_price' : util.estimated_price(content['location'].lower(),content['total_sqft'],content["bhk"],content["bath"])
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")


    return response

@app.route('/')
def root():
    return "Server is running"


if __name__ == '__main__':
    util.load_saved_artifacts()
    app.run()
    print("Server is running")
