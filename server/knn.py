import numpy as np

# Define distance functions
def manhattan_distance(p1, p2):
    return np.sum(np.abs(p1 - p2))

def euclidean_distance(p1, p2):
    return np.sqrt(np.sum((p1 - p2) ** 2))

def supremum_distance(p1, p2):
    return np.max(np.abs(p1 - p2))

# KNN Prediction function
def knn_predict(X_train, y_train, X_test, k, distance_metric):
    predictions = []
    for test_point in X_test:
        distances = [distance_metric(test_point, train_point) for train_point in X_train]
        k_indices = np.argsort(distances)[:k]
        k_labels = y_train[k_indices]
        unique, counts = np.unique(k_labels, return_counts=True)
        predictions.append(unique[np.argmax(counts)])
    return np.array(predictions)

# Normalization function
def normalize(X_train):
    min_values = np.min(X_train, axis=0)
    max_values = np.max(X_train, axis=0)
    return (X_train - min_values) / (max_values - min_values)
