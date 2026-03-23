from pathlib import Path
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, mean_absolute_error
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "synthetic_athero.csv"
MODEL_DIR = BASE_DIR / "saved_models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(DATA_FILE)

X = df.drop(columns=["health_label", "plaque_stage", "risk_score"])
X = pd.get_dummies(X)

feature_columns = X.columns.tolist()

y_health = df["health_label"]

health_encoder = LabelEncoder()
y_health_encoded = health_encoder.fit_transform(y_health)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_health_encoded,
    test_size=0.2,
)

health_model = RandomForestClassifier(
    n_estimators=500,
    n_jobs=-1,
)

health_model.fit(X_train, y_train)
health_preds = health_model.predict(X_test)

print("health label accuracy:", accuracy_score(y_test, health_preds))

y_plaque = df["plaque_stage"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_plaque,
    test_size=0.2,
)

plaque_model = RandomForestClassifier(
    n_estimators=500,
    n_jobs=-1,
)

plaque_model.fit(X_train, y_train)
plaque_preds = plaque_model.predict(X_test)

print("plaque stage accuracy:", accuracy_score(y_test, plaque_preds))

y_risk = df["risk_score"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_risk,
    test_size=0.2,
)

risk_model = RandomForestRegressor(
    n_estimators=500,
    n_jobs=-1,
)

risk_model.fit(X_train, y_train)
risk_preds = risk_model.predict(X_test)

print("risk score off by:", mean_absolute_error(y_test, risk_preds))
