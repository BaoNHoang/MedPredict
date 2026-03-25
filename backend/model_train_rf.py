from pathlib import Path
# import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, mean_absolute_error
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "synthetic_athero.csv"
MODEL_DIR = BASE_DIR / "saved_models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

NUMERIC_COLS = [
    "age_years",
    "height_cm",
    "weight_kg",
    "blood_pressure_mmHg",
    "ldl_mg_dL",
]

BOOL_COLS = [
    "family_history_heart_disease",
    "hypertension",
    "diabetes",
    "on_statin",
    "on_bp_meds",
    "clinical_ascvd_history",
    "heart_attack_history",
    "stroke_tia_history",
    "peripheral_artery_disease_history",
    "recent_cardio_event_12mo",
    "multi_plaque_dev",
]

CAT_COLS = [
    "sex",
    "smoking_status",
    "activity_level",
]

def clean_common(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    missing_markers = {"", " ", "na", "n/a", "none", "null", "unknown", "Unknown", "UNK"}
    df = df.replace(list(missing_markers), pd.NA)

    for col in NUMERIC_COLS:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df.loc[(df["age_years"] < 18) | (df["age_years"] > 100), "age_years"] = pd.NA
    df.loc[(df["height_cm"] < 120) | (df["height_cm"] > 230), "height_cm"] = pd.NA
    df.loc[(df["weight_kg"] < 30) | (df["weight_kg"] > 250), "weight_kg"] = pd.NA
    df.loc[(df["blood_pressure_mmHg"] < 70) | (df["blood_pressure_mmHg"] > 250), "blood_pressure_mmHg"] = pd.NA
    df.loc[(df["ldl_mg_dL"] < 20) | (df["ldl_mg_dL"] > 350), "ldl_mg_dL"] = pd.NA

    bool_map = {
        True: 1,
        False: 0,
        "True": 1,
        "False": 0,
        "true": 1,
        "false": 0,
        "1": 1,
        "0": 0,
        1: 1,
        0: 0,
        "yes": 1,
        "no": 0,
        "Y": 1,
        "N": 0,
    }

    for col in BOOL_COLS:
        df[col] = df[col].map(bool_map)

    sex_map = {
        "m": "M",
        "male": "M",
        "f": "F",
        "female": "F",
    }
    smoking_map = {
        "never": "never",
        "former": "former",
        "current": "current",
    }
    activity_map = {
        "low": "low",
        "moderate": "moderate",
        "high": "high",
    }

    df["sex"] = df["sex"].astype("string").str.strip().str.lower().map(sex_map)
    df["smoking_status"] = df["smoking_status"].astype("string").str.strip().str.lower().map(smoking_map)
    df["activity_level"] = df["activity_level"].astype("string").str.strip().str.lower().map(activity_map)

    return df

def fit_preprocess(X_train: pd.DataFrame):
    X_train = clean_common(X_train)

    numeric_fill_values = {}
    for col in NUMERIC_COLS:
        median_val = X_train[col].median()
        numeric_fill_values[col] = float(median_val) if pd.notna(median_val) else 0.0

    bool_fill_values = {}
    for col in BOOL_COLS:
        mode_val = X_train[col].mode(dropna=True)
        fill_val = int(mode_val.iloc[0]) if not mode_val.empty else 0
        bool_fill_values[col] = fill_val

    cat_fill_values = {col: "missing" for col in CAT_COLS}

    preprocess_config = {
        "numeric_fill_values": numeric_fill_values,
        "bool_fill_values": bool_fill_values,
        "cat_fill_values": cat_fill_values,
    }

    return preprocess_config

def apply_preprocess(X: pd.DataFrame, preprocess_config: dict) -> pd.DataFrame:
    X = clean_common(X)

    for col in NUMERIC_COLS:
        X[col] = X[col].fillna(preprocess_config["numeric_fill_values"][col])

    for col in BOOL_COLS:
        X[col] = X[col].fillna(preprocess_config["bool_fill_values"][col]).astype(int)

    for col in CAT_COLS:
        X[col] = X[col].fillna(preprocess_config["cat_fill_values"][col])

    return X

def encode_and_align(X_train: pd.DataFrame, X_test: pd.DataFrame):
    X_train = pd.get_dummies(X_train)
    X_test = pd.get_dummies(X_test)

    X_test = X_test.reindex(columns=X_train.columns, fill_value=0)

    return X_train, X_test

df = pd.read_csv(DATA_FILE)

X_raw = df.drop(columns=["health_label", "plaque_stage", "risk_score"])
y_health = df["health_label"]
y_plaque = df["plaque_stage"]
y_risk = df["risk_score"]

train_idx, test_idx = train_test_split(
    df.index,
    test_size=0.2,
    random_state=1,
    stratify=y_health,
)

X_train_raw = X_raw.loc[train_idx].copy()
X_test_raw = X_raw.loc[test_idx].copy()

preprocess_config = fit_preprocess(X_train_raw)
# joblib.dump(preprocess_config, MODEL_DIR / "rf_preprocess_config.joblib")

X_train_clean = apply_preprocess(X_train_raw, preprocess_config)
X_test_clean = apply_preprocess(X_test_raw, preprocess_config)

X_train, X_test = encode_and_align(X_train_clean, X_test_clean)

feature_columns = X_train.columns.tolist()
# joblib.dump(feature_columns, MODEL_DIR / "rf_feature_columns.joblib")

y_health_train = y_health.loc[train_idx]
y_health_test = y_health.loc[test_idx]

health_encoder = LabelEncoder()
y_health_train_encoded = health_encoder.fit_transform(y_health_train)
y_health_test_encoded = health_encoder.transform(y_health_test)

health_model = RandomForestClassifier(
    n_estimators=500,
    random_state=1,
    n_jobs=-1,
)

health_model.fit(X_train, y_health_train_encoded)
health_preds = health_model.predict(X_test)

print("health label accuracy:", accuracy_score(y_health_test_encoded, health_preds))

# joblib.dump(health_model, MODEL_DIR / "rf_health_model.joblib")
# joblib.dump(health_encoder, MODEL_DIR / "rf_health_encoder.joblib")

y_plaque_train = y_plaque.loc[train_idx]
y_plaque_test = y_plaque.loc[test_idx]

plaque_model = RandomForestClassifier(
    n_estimators=500,
    random_state=1,
    n_jobs=-1,
)

plaque_model.fit(X_train, y_plaque_train)
plaque_preds = plaque_model.predict(X_test)

print("plaque stage accuracy:", accuracy_score(y_plaque_test, plaque_preds))

# joblib.dump(plaque_model, MODEL_DIR / "rf_plaque_model.joblib")

y_risk_train = y_risk.loc[train_idx]
y_risk_test = y_risk.loc[test_idx]

risk_model = RandomForestRegressor(
    n_estimators=500,
    random_state=1,
    n_jobs=-1,
)

risk_model.fit(X_train, y_risk_train)
risk_preds = risk_model.predict(X_test)

print("risk score off by:", mean_absolute_error(y_risk_test, risk_preds))

# joblib.dump(risk_model, MODEL_DIR / "rf_risk_model.joblib")

print("DONE - saved:", MODEL_DIR)