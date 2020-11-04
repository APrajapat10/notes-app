const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your Notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added.");
  } else {
    console.log("Note title taken.");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const noteToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  if (noteToKeep.length < notes.length)
    console.log(chalk.green.inverse("Note removed."));
  else console.log(chalk.red.inverse("No Note removed."));

  saveNotes(noteToKeep);
};

const listNote = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Your notes..."));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToPrint = notes.find((note) => {
    return note.title === title;
  });
  if (noteToPrint)
    console.log(`Title: ${noteToPrint.title} Body: ${noteToPrint.body}`);
  else console.log(chalk.red.inverse("Note not found."));
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
