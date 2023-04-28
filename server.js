const express = require('express');
const path = require('path');
const fs = require('fs');
const NotesDb = require('./Develop/db/db.json'); 

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

//
app.get('/api', (req, res) => res.json(NotesDb));

// POST request
app.post('/api/notes', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);