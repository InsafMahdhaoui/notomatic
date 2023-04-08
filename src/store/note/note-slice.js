import { createSlice } from "@reduxjs/toolkit";
export const noteSlice = createSlice({
  name: "noteSlice",
  initialState: {
    noteList: [],
  },
  reducers: {
    setNoteList: (currentSlice, action) => {
      currentSlice.noteList = action.payload;
    },
    addNote: (currentSlice, action) => {
      currentSlice.noteList.push(action.payload);
    },
    updateNote: (currentSlice, action) => {
      //chercher l'index de la note qu'on veut updater
      const indexToUpdate = currentSlice.noteList.findIndex(
        note => note.id === action.payload.id,
      ); //findIndex acces aux notes et va boucler et cherche quelle note son id correspond a l'id donnee au predicat et puis retourner son index
      currentSlice.noteList[indexToUpdate] = action.payload; //ici on a ecraser le contenu du note et le remplacee par le nouveau coontenue dans l'update
    },
    deleteNote: (currentSlice, action) => {
      const filteredNoteList = currentSlice.noteList.filter(
        note => note.id !== action.payload.id,
      ); //ici on filtre le tableau des notes et on garde que les notes qui ont un id different a l'id du note envoyee dans l'action.payload
      currentSlice.noteList = filteredNoteList;
    },
  },
});
export const noteReducer = noteSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote } =
  noteSlice.actions;
