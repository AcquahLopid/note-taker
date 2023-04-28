const express = require('express');
const path = require('path');
const fs = require('fs');
const NotesDb = require('./Develop/db/db.json'); 
const { readAndAppend, readFromFile } = require('./helpers/fsUtils')

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

// POST request
app.get('/api/notes', (req, res) => {

  fs.readFile(NotesDb, (err, data) => {
      if(err){
        console.error(err);
      } else if (!err){
        // parses data if it isnt an error
        const parsedJson = JSON.parse(data);
        return res.json(parsedJson);
      } else{
        // returns empty array 
        return res.json([]);
      }
    });
});

app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  if(title && text){
    // object created for new notes
    const createNote = {
      title,
      text, 
    };
    //appends created note to current notes
    readAndAppend(createNote, NotesDb);
  } else{
    res.json('error in making a new note');
  }
})

app.get('*', (req, res) => {
  
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);