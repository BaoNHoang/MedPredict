def bmi(height_cm, weight_kg):
    h = height_cm / 100
    return weight_kg / (h * h)

def risk_score(row):
    age = row["age_years"]
    b = bmi(row["height_cm"], row["weight_kg"])

    score = 0

    score += max(0, (age - 20) // 5) * 4
    if row["sex"] == "M": score += 5

    if b >= 30: score += 10
    elif b >= 25: score += 5

    if row["smoking_status"] == "current": score += 15
    elif row["smoking_status"] == "former": score += 7

    if row["activity_level"] == "low": score += 8
    elif row["activity_level"] == "moderate": score += 3

    if row["family_history_heart_disease"]: score += 8
    if row["hypertension_dx"]: score += 12
    if row["diabetes_dx"]: score += 12
    if row["on_statin"]: score += 2
    if row["on_bp_meds"]: score += 2
    if row["clinical_ascvd_history"]: score += 25
    if row["mi_history"]: score += 15
    if row["stroke_tia_history"]: score += 15
    if row["pad_history"]: score += 12

    if row["recent_acute_event_12mo"]: score += 12
    if row["multi_bed_disease"]: score += 10

    return score

def plaque_stage(score, row):
    event_count = int(row["mi_history"]) + int(row["stroke_tia_history"]) + int(row["pad_history"])

    if row["recent_acute_event_12mo"] or row["multi_bed_disease"] or event_count >= 2 or score >= 80:
        return 4
    if row["clinical_ascvd_history"] or row["mi_history"] or row["stroke_tia_history"] or row["pad_history"] or score >= 60:
        return 3
    if score >= 40: return 2
    if score >= 15: return 1
    return 0


if __name__ == "__main__":
    pass