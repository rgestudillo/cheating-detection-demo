from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Training data and labels
X_train = np.load("X_train.npy")  # Pre-saved training data
y_train = np.load("y_train.npy")  # Pre-saved training labels
k = 5  # Number of neighbors

# Define distance functions
def manhattan_distance(p1, p2):
    return np.sum(np.abs(p1 - p2))

def euclidean_distance(p1, p2):
    return np.sqrt(np.sum((p1 - p2) ** 2))

def supremum_distance(p1, p2):
    return np.max(np.abs(p1 - p2))

# Define the KNN prediction function
def knn_predict(X_train, y_train, X_test, k, distance_metric):
    predictions = []
    for test_point in X_test:
        distances = [distance_metric(test_point, train_point) for train_point in X_train]
        k_indices = np.argsort(distances)[:k]
        k_labels = y_train[k_indices]
        unique, counts = np.unique(k_labels, return_counts=True)
        predictions.append(unique[np.argmax(counts)])
    return np.array(predictions)

# Normalize function
min_values = np.min(X_train, axis=0)
max_values = np.max(X_train, axis=0)

def normalize(features):
    return (features - min_values) / (max_values - min_values)

# Input schemas
class Features(BaseModel):
    browserTabsOpen: int
    timePerQuestion: float
    keyboardActivity: float
    mouseMovements: float
    proximityAlerts: int
    inactivityPeriods: float
    windowSwitches: int

class QuizData(BaseModel):
    features: Features
    userAnswers: list[str]

# quiz answers
correct_answers = [
  "b", "b", "a", "b", "a", "b", "c", "b", "c", "d", 
  "a", "b", "b", "b", "d", "a", "b", "b", "c", "a", 
  "c", "b", "d", "a", "a"
]

@app.post("/analyze")
async def analyze_quiz(data: QuizData):
    print(data)
    # Extract and normalize features
    raw_features = np.array([
        data.features.browserTabsOpen,
        data.features.timePerQuestion,
        data.features.keyboardActivity,
        data.features.mouseMovements,
        data.features.proximityAlerts,
        data.features.inactivityPeriods,
        data.features.windowSwitches,
    ])
    normalized_features = normalize(raw_features).reshape(1, -1)

    # Predict cheating probability using Euclidean distance
    prediction = knn_predict(X_train, y_train, normalized_features, k, distance_metric=euclidean_distance)
    cheating_status = "Cheating Detected" if prediction[0] == 1 else "Not Cheating"
    print(f"Cheating Status: {prediction[0]}")
    
    # Calculate score
    score = sum(1 for user_answer, correct_answer in zip(data.userAnswers, correct_answers) if user_answer == correct_answer)

    # Return results
    return {
        "prediction": int(prediction[0]),
        # "status": cheating_status,
        "score": score,
    }
