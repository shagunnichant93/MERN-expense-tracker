const express = require('express');
const app = express();

app.use(express.json()); //lets the server read the json data from the request body


// Define your routes here
app.get("/api/health", (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000 in localhost');
});