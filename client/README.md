This is a complete MERN application of exprense tracker.

## Add:
When the user clicks Add, React's handleSubmit runs fetch with a POST. Express receives it at /api/expenses, express.json() parses the body, Mongoose saves it to MongoDB, and Express sends the saved document back. React adds it to state, so the screen updates."

