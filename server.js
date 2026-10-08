const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/MERN-expense-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

  const expenseSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", expenseSchema);


app.use(express.json()); //lets the server read the json data from the request body


// Define your routes here
app.get("/api/health", (req, res) => {
    res.json({ message: 'Server is running!' });
});
app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const expense = await Expense.create({ title, amount });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*Paste in console in browser after F12 for testing above POST request to add an expense
 and GET request to retrieve all expenses
fetch("http://localhost:5000/api/expenses", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Coffee", amount: 120 })
}).then(r => r.json()).then(console.log);
*/

app.listen(5000, () => {
    console.log('Server is running on port 5000 in localhost');
});