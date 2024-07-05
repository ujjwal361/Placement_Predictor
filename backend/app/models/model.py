import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import preprocessing
import os

# Load your dataset
df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'collegePlace.csv'))

# Preprocess the data
x = df.drop('PlacedOrNot', axis='columns')
x = x.drop('Age', axis='columns')
x = x.drop('Hostel', axis='columns')
y = df['PlacedOrNot']

le = preprocessing.LabelEncoder()
x['Gender'] = le.fit_transform(x['Gender'])
x['Stream'] = le.fit_transform(x['Stream'])

# Split the dataset into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=100)

# Train the model
classify = RandomForestClassifier(n_estimators=10, criterion="entropy")
classify.fit(x_train, y_train)

# Save the model
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
pickle.dump(classify, open(model_path, 'wb'))

# Test the model
model = pickle.load(open(model_path, 'rb'))
print(model.predict([[1, 1, 1, 0, 0]]))
