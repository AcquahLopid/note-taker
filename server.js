const express = require('express');
const path = require('path');
const fs = require('fs');
const NotesDb = require('./Develop/db/db.json'); 
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// get Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get Route for notes created
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// api route to get all of our notes
app.get('/api/notes', (req, res) => {

  fs.readFile(NotesDb, (err, data) => {
      if(err){
        console.error(err);
      } else if (!err){
        // parses data if it isnt an error
        const parsedData = JSON.parse(data);
        return res.json(parsedData);
      } else{
        // returns empty array 
        return res.json([]);
      }
    });
});

// api route to post our made notes and then append them
app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  if(title && text){
    // object created for new notes
    const createNote = {
      title,
      text,
      id: uuidv4(), 
    };
    //appends created note to current notes
    readAndAppend(createNote, NotesDb);
  } else{
    res.json('error in making a new note');
  }
})

// catching all request to the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);