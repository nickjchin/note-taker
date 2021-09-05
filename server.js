// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
var notes = require("./db/db.json");

// Initiate Express
const app = express();
const PORT = process.env.PORT || 3001;

currentID = notes.length;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Request for all saved notes
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// Get Route for notes
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Get Route for index file
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// POST request
app.post("/api/notes", (req, res) => {
  // Log that a POST request whas received
  console.info(`${req.method} request received to add a note`);
  let newNote = req.body;
  newNote.id = currentID + 1;
  console.log(newNote);
  // Add a new note
  notes.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(notes), (writeErr) =>
    writeErr ? console.log(writeErr) : console.info("Successfully updated notes!")
  );

  const response = {
    status: "success",
    body: newNote,
  };
  console.log(response);
  res.status(201).json(response);
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
