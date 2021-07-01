###################################
# Backend API for Capestone project
###################################  
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def defaultRoute():
    res = {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
             "bs": "harness real-time e-markets"
        }
    }
    return jsonify(res)

@app.route('/predict',methods=['POST'])
def predictAssignmentGroup():
    '''
    Main predict function to do the needed preprocessing and predict the final outcome
    '''
    res_json = {}
    # int_features = [x for x in request.form.values()];
    int_features = request.json;
    features_array = [];
    features_array.append(int_features.get('short_desc'));
    features_array.append(int_features.get('desc'));

    # combine the description
    combined_desc = features_array[0].strip() + features_array[1].strip();
    data = [[combined_desc]]
    df = pd.DataFrame(data, columns=['Combined Description'])

    print(df['Combined Description'].values);


    # Final output response string
    res_json['short_desc'] = features_array[0];
    res_json['desc'] = features_array[1];
    res_json['combined_string'] = df['Combined Description'].values[0];

    return res_json;



if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True, port=8080)