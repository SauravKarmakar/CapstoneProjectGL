###################################
# Backend API for Capestone project
###################################
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
import pickle
# import tensorflow as tf


# For model saving using keras.
# from keras.models import load_model

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
model = keras.models.load_model('./models/ticketing_assignment_model.h5');

max_features = 40000
maxlen = 250
embedding_size = 200
tokenizer=Tokenizer(num_words=max_features)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# model = pickle.load('./models/ticketing_assignment_model.h5');

@app.route('/')
def defaultRoute():
    res = {
        "name": "Capestone project GL",
        "group": "Group 5C Jone 20B",
        "members": ["Krish", "Shivangi","Rajlakshmi", "Saurav"]
    }
    return jsonify(res)


@app.route('/predict', methods=['POST'])
def predictAssignmentGroup():
    '''
    Main predict function to do the needed preprocessing and predict the final outcome
    '''
    res_json = {}
    # int_features = [x for x in request.form.values()];
    int_features = request.json;
    features_array = [int_features.get('short_desc'), int_features.get('desc')]

    # combine the description
    combined_desc = features_array[0].strip() + features_array[1].strip()
    data = [[combined_desc]]
    df = pd.DataFrame(data, columns=['Combined Description'])

    print(df['Combined Description'].values)

    # Final output response string
    res_json['short_desc'] = features_array[0]
    res_json['desc'] = features_array[1]
    res_json['combined_string'] = df['Combined Description'].values[0]

    # Tokenizing it
    tokenizer.fit_on_texts(df['Combined Description'].values)
    sequences = tokenizer.texts_to_sequences(df['Combined Description'].values)
    # print(sequences.
    # summary = str(model.summary())
    res_json['model_summary'] = get_model_summary(model)

    X = tf.keras.preprocessing.sequence.pad_sequences(
        sequences, maxlen=maxlen)
    # print(X)
    Y_pred = model.predict(X)
    Y_pred_classes = np.argmax(Y_pred, axis=1)

    res_json['predicted_class'] = str(Y_pred_classes[0])
    print(Y_pred_classes)

    return res_json;

def get_model_summary(model: tf.keras.Model) -> str:
    string_list = []
    model.summary(line_length=80, print_fn=lambda x: string_list.append(x))
    return "\n".join(string_list)

if __name__ == '__main__':
    # app.run(debug=True, port=8080)
    app.run(host="0.0.0.0",debug=True, port=8080)
