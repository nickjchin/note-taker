// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initiate Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Get Route for notes
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Get Route for index file
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// GET Request for all saved notes
app.get("/api/notes", (req, res) => {
  res.status(200).json(`${req.method} request received to get notes`);
  // Log request to the terminal
  console.log(`${req.method} request received to get notes`);
  // Returns all saved notes as JSON
  return res.json(notes);
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}🚀`));
