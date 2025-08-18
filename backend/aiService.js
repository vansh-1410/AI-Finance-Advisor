// aiService.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/advice", (req, res) => {
  const transactions = req.body.transactions || [];

  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else if (t.type === "expense") expense += t.amount;
  });

  const net = income - expense;
  const tips = [];

  // ---------- Basic advice ----------
  if (expense > income * 0.8) {
    tips.push("⚠️ Your expenses are too high compared to your income. Try to cut down.");
  }
  if (income > 0 && expense === 0) {
    tips.push("ℹ️ You haven't logged any expenses. Make sure you're tracking everything.");
  }
  if (net > 0) {
    tips.push("✅ Great! You're saving money.");
  }
  if (net < 0) {
    tips.push("❌ You're spending more than you earn. Create a budget plan.");
  }

  // ---------- Extra rules ----------
  if (expense > income * 0.5) {
    tips.push("💡 More than half of your income goes to expenses. Try saving more.");
  }
  if (net > income * 0.3) {
    tips.push("💰 You're saving a healthy portion of income. Consider investing.");
  }
  if (expense < income * 0.2 && income > 0) {
    tips.push("🌟 Excellent! Your expenses are well under control.");
  }
  if (income === 0) {
    tips.push("📉 No income recorded. Add your income sources.");
  }

  res.json({
    income,
    expense,
    net,
    tips: tips.length ? tips : ["Looking good, keep tracking regularly"]
  });
});

app.listen(5001, () => {
  console.log("AI service running on http://127.0.0.1:5001");
});
