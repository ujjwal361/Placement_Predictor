# backend/app/routes.py
from flask import Blueprint, request, jsonify, current_app
from . import db
from .models import YourModel
import pickle
import os
import pandas as pd
import numpy as np


bp = Blueprint('routes', __name__)
@bp.before_app_request
def load_model():
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'model.pkl')
    with open(model_path, 'rb') as file:
        current_app.model = pickle.load(file)

@bp.route('/')
def home():
    return 'Flask app is running!'

@bp.route('/data', methods=['POST'])
def collect_data():
    try:
        data = request.json

        # Convert 'placed' to boolean
        placed_value = data['placed'].lower() in ['true', '1', 'yes']

        new_entry = YourModel(
            branch=data['branch'],
            cgpa=data['cgpa'],
            internships=data['internships'],
            backlogs=data['backlogs'],
            gender=data['gender'],
            placed=placed_value  # Use the converted boolean value
        )

        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'Data collected successfully'}), 201
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        print(f"Error: {e}")  # Print the error to console for debugging
        return jsonify({'error': str(e)}), 500
@bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        gender_mapping = {'Male': 1, 'Female': 0}
        stream_mapping = {
            'Civil':0,
            'Computer Science': 1,
            'Electronics And Communication': 2,
            'Electrical': 3,
            'Information Technology': 4,
            'Mechanical': 5,
        }
        gender = gender_mapping.get(data['gender'])
        stream = stream_mapping.get(data['branch'])
        internship = float(data['internships'])
        cgpa = float(data['cgpa'])
        backlogs = float(data['backlogs'])
        gender = gender_mapping.get(data['gender'])
        stream = stream_mapping.get(data['branch'])
        internship = float(data['internships'])
        cgpa = float(data['cgpa'])
        backlogs = float(data['backlogs'])

        input_features = np.array([gender, stream, internship, cgpa, backlogs], dtype=float).reshape(1, -1)

        prediction = current_app.model.predict(input_features)

        output = 'You have high chances of getting placed!!!' if prediction == 1 else 'You have low chances of getting placed. All the best.'

        return jsonify({'prediction': output})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
