from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import knn  # Import the knn.py module

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
    normalized_features = knn.normalize(raw_features).reshape(1, -1)

    # Predict cheating probability using Euclidean distance
    prediction = knn.knn_predict(X_train, y_train, normalized_features, k, distance_metric=knn.euclidean_distance)
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
