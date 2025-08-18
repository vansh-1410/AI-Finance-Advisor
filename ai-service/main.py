from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get("/")
def ping():
    return jsonify({ "message": "ai service ok" })

@app.post("/advice")
def advice():
    data = request.get_json(silent=True) or {}
    items = data.get("transactions", [])

    income = sum(float(x.get("amount", 0)) for x in items if x.get("type") == "income")
    expense = sum(float(x.get("amount", 0)) for x in items if x.get("type") == "expense")
    net = income - expense
    tips = []

    if income == 0 and expense == 0:
        tips.append("Add a few transactions to get personalized advice.")

    if expense > income and income > 0:
        tips.append("Your spending is higher than income, cap variable spends to 80% of income.")

    if net > 0 and net < income * 0.2:
        tips.append("Try saving at least 20% of income, increase savings by 5% next month.")

    # Category-wise totals
    cat_totals = {}
    if expense > 0:
        for t in items:
            if t.get("type") == "expense":
                c = (t.get("category") or "other").lower()
                cat_totals[c] = cat_totals.get(c, 0) + float(t.get("amount", 0))
        top = sorted(cat_totals.items(), key=lambda k: k[1], reverse=True)[:3]
        if top:
            hot = ", ".join(f"{k} ₹{int(v)}" for k, v in top)
            tips.append(f"Top expense buckets: {hot}")

    if net < 0 and income == 0:
        tips.append("Log income to balance the view.")

    # --- SMART RULES ---
    if net > 0:
        if net > income * 0.3:
            tips.append("Great! You are saving more than 30% of income, keep it up.")
        elif net < income * 0.1:
            tips.append("Your savings are too low, try reducing non-essential expenses.")
        else:
            tips.append("Good savings, but aim for 30% savings rate for financial freedom.")

    if expense > income * 0.5:
        tips.append("Your expenses are more than 50% of income, consider cutting down on wants vs needs.")

    if "food" in cat_totals and cat_totals["food"] > income * 0.2:
        tips.append("Spending too much on food, try meal planning or home cooking.")

    if "shopping" in cat_totals and cat_totals["shopping"] > income * 0.15:
        tips.append("High shopping expense detected, limit impulse purchases.")

    if net > 0 and expense < income * 0.5:
        tips.append("You have good surplus, consider investing in mutual funds or fixed deposits.")

    if net > income * 0.4:
        tips.append("Excellent savings! Time to build an emergency fund and explore investments.")

    return jsonify({
        "income": income,
        "expense": expense,
        "net": net,
        "tips": tips or ["Looking good, keep tracking regularly."]
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
