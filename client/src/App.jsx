import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => setExpenses(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount: Number(amount) }),
    });
    const newExpense = await res.json();
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };
  const handleDelete = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  setExpenses(expenses.filter((exp) => exp._id !== id));
};

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Amount:</label>
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br/>
        <button type="submit">Add</button>
      </form>

      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
          {exp.title}: {exp.amount}{" "}
          <button onClick={() => handleDelete(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;