const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const data = JSON.parse(fs.readFileSync('routes.json'));

app.get('/api/v1/routes', (req, res) => {
    res.json(data);
});

app.get('/api/v1/routes/:id', (req, res) => {
    const route = data.find(route => route.id == req.params.id);
    if (!route) {
        res.status(404).json({ message: `Route with id ${req.params.id} not found` });
    } else {
        res.json(route);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});