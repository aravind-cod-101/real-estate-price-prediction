import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None


def estimated_price(location, sqft, bhk, bath):
    global __model
    global __data_columns
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)


def get_location_names():
    global __locations
    return __locations


def load_saved_artifacts():
    print("Loading saved artifacts")
    global __locations
    global __data_columns
    global __model

    with open('./artifacts/columns.json', 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
    with open('./artifacts/bangalore_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("Artifacts loaded")


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(estimated_price('Nagar', 1000, 2, 2))
    print(estimated_price('Nagar', 1000, 2, 2))
