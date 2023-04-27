const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// get Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

// get Route for notes created
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);