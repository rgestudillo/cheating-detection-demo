# import libraries we need
import numpy as np
import pandas as pd

# Distance Metrics

def manhattan_distance(p1, p2):
    """Calculate Manhattan distance."""
    return np.sum(np.abs(p1 - p2))

def euclidean_distance(p1, p2):
    """Calculate Euclidean distance."""
    return np.sqrt(np.sum((p1 - p2) ** 2))

def supremum_distance(p1, p2):
    """Calculate Supremum (Chebyshev) distance."""
    return np.max(np.abs(p1 - p2))

# KNN Implementation

def knn_predict(X_train, y_train, X_test, k, distance_metric):
    """KNN prediction from scratch."""
    predictions = []

    for test_point in X_test:
        # Compute the distance of the test point to all training points
        distances = [distance_metric(test_point, train_point) for train_point in X_train]

        # Sort the distances and get the indices of the k smallest distances
        k_indices = np.argsort(distances)[:k]

        # Get the labels of the k nearest neighbors
        k_labels = y_train[k_indices]

        # Assign the majority class of the k nearest neighbors
        unique, counts = np.unique(k_labels, return_counts=True)
        predictions.append(unique[np.argmax(counts)])

    return np.array(predictions)

# Preprocess Data
def preprocess_data(data_path):
    """Load and preprocess the dataset."""
    df = pd.read_csv(data_path)

    # Convert categorical columns to numeric using one-hot encoding
    df = pd.get_dummies(df, drop_first=True)

    # Separate features and target
    X = df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    # Normalize the features
    X = (X - np.min(X, axis=0)) / (np.max(X, axis=0) - np.min(X, axis=0))

    return X, y

# Split Dataset
def train_test_split(X, y, test_size=0.2, random_state=42):
    """Split dataset into training and testing sets."""
    np.random.seed(random_state)
    indices = np.arange(len(X))
    np.random.shuffle(indices)

    split = int(len(X) * (1 - test_size))
    train_indices, test_indices = indices[:split], indices[split:]

    return X[train_indices], X[test_indices], y[train_indices], y[test_indices]

if __name__ == "__main__":
    # Parameters
    data_path = "dataset.csv"
    k = 5

    # Load and preprocess data
    X, y = preprocess_data(data_path)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y)

    # Evaluate KNN with different distance metrics
    for distance_name, distance_function in zip(
        ["Manhattan", "Euclidean", "Supremum"],
        [manhattan_distance, euclidean_distance, supremum_distance],
    ):
        print(f"Evaluating KNN with {distance_name} distance:")
        predictions = knn_predict(X_train, y_train, X_test, k, distance_function)

        # Calculate accuracy
        accuracy = np.mean(predictions == y_test)
        print(f"Accuracy: {accuracy:.2f}\n")
