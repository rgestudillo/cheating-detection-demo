import { MultipleChoice } from '../models/MultipleChoice';

export const quizData: MultipleChoice[] = [
  {
    question: "What is a spline in spline regression?",
    choices: ["A type of neural network", "A piecewise polynomial function", "A linear regression model", "A decision tree algorithm"],
    answer: "b"
  },
  {
    question: "Why are splines used in regression?",
    choices: ["To model linear relationships", "To handle non-linear patterns in data", "To reduce overfitting", "To classify data points"],
    answer: "b"
  },
  {
    question: "What is a 'knot' in spline regression?",
    choices: ["A point where two spline segments meet", "A point where overfitting occurs", "The highest degree of a polynomial", "A data preprocessing step"],
    answer: "a"
  },
  {
    question: "What type of spline has continuous first and second derivatives?",
    choices: ["Linear spline", "Cubic spline", "Quadratic spline", "Natural spline"],
    answer: "b"
  },
  {
    question: "What is a natural spline?",
    choices: ["A spline constrained to linearity at its ends", "A spline with no knots", "A spline fitted only to natural numbers", "A non-parametric regression model"],
    answer: "a"
  },
  {
    question: "What is the degree of a cubic spline?",
    choices: ["2", "3", "4", "5"],
    answer: "b"
  },
  {
    question: "What is the primary advantage of spline regression over polynomial regression?",
    choices: ["Simplicity of implementation", "Better handling of boundary conditions", "Flexibility without overfitting", "Faster computation"],
    answer: "c"
  },
  {
    question: "What does regularization in spline regression aim to prevent?",
    choices: ["Underfitting", "Overfitting", "Computational inefficiency", "Data scaling issues"],
    answer: "b"
  },
  {
    question: "How are knots chosen in spline regression?",
    choices: ["Randomly", "Equally spaced", "Based on domain knowledge or cross-validation", "By clustering the data points"],
    answer: "c"
  },
  {
    question: "What library in Python provides tools for spline regression?",
    choices: ["scikit-learn", "scipy", "statsmodels", "All of the above"],
    answer: "d"
  },
  {
    question: "Which function in SciPy is commonly used for cubic splines?",
    choices: ["scipy.interpolate.CubicSpline", "scipy.optimize.curve_fit", "scipy.stats.linregress", "scipy.signal.spline"],
    answer: "a"
  },
  {
    question: "In R, which package is widely used for spline regression?",
    choices: ["dplyr", "splines", "ggplot2", "glmnet"],
    answer: "b"
  },
  {
    question: "How is the flexibility of a spline controlled?",
    choices: ["By the degree of the polynomial", "By the number and placement of knots", "By the size of the dataset", "By the choice of the kernel"],
    answer: "b"
  },
  {
    question: "Which method is commonly used to smooth splines?",
    choices: ["Cross-validation", "Regularization", "Clustering", "Backpropagation"],
    answer: "b"
  },
  {
    question: "What does the term 'basis function' refer to in spline regression?",
    choices: ["A polynomial used in each segment", "The loss function to optimize", "The decision boundary", "A set of functions used to model the data"],
    answer: "d"
  },
  {
    question: "Which spline type is designed for high-dimensional data?",
    choices: ["Thin plate spline", "Natural cubic spline", "Linear spline", "Multivariate spline"],
    answer: "a"
  },
  {
    question: "What is the key property of B-splines?",
    choices: ["They are defined only for cubic functions", "They have local support", "They minimize error globally", "They are equivalent to linear models"],
    answer: "b"
  },
  {
    question: "What optimization method is commonly used to fit splines?",
    choices: ["Gradient descent", "Least squares", "Genetic algorithms", "Support vector optimization"],
    answer: "b"
  },
  {
    question: "Which type of spline avoids overfitting by penalizing the roughness?",
    choices: ["B-spline", "Natural spline", "Smoothing spline", "Linear spline"],
    answer: "c"
  },
  {
    question: "How does adding knots affect a spline model?",
    choices: ["It increases flexibility", "It reduces computational cost", "It decreases model complexity", "It forces linearity in the model"],
    answer: "a"
  },
  {
    question: "Which of these is a common application of spline regression?",
    choices: ["Image classification", "Time series forecasting", "Regression on non-linear relationships", "Clustering"],
    answer: "c"
  },
  {
    question: "In which domain are splines commonly used for interpolation?",
    choices: ["Healthcare", "Graphics and animation", "Sports analytics", "Stock market prediction"],
    answer: "b"
  },
  {
    question: "What is a drawback of spline regression?",
    choices: ["Lack of interpretability", "High risk of overfitting", "Computational inefficiency for small datasets", "Choice of knots is subjective"],
    answer: "d"
  },
  {
    question: "What is the primary difference between interpolation splines and regression splines?",
    choices: ["Interpolation splines pass through all data points", "Regression splines use neural networks", "Regression splines fit only linear data", "Interpolation splines require regularization"],
    answer: "a"
  },
  {
    question: "Which metric is often used to evaluate spline regression models?",
    choices: ["Mean Squared Error (MSE)", "F1-score", "Precision", "Log-loss"],
    answer: "a"
  }
];