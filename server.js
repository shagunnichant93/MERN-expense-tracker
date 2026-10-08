const express = require('express');
const app = express();

app.use(express.json()); //lets the server read the json data from the request body


// Define your routes here
app.get("/api/health", (req, res) => {
    res.json({ message: 'Server is running!' });
});

const expenses = [];

app.post("/api/expenses", (req, res) => {
    const { title, amount } = req.body;
    const expense = {id: Date.now(), title, amount};    
    expenses.push(expense);
    res.status(201).json(expense);
});

app.get("/api/expenses", (req, res) => {
    res.json(expenses);
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