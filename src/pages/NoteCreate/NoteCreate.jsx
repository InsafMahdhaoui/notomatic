import { NoteForm } from "components/NoteForm/NoteForm";
import s from "./style.module.css";
import { NoteAPI } from "api/note-api";
import { useDispatch } from "react-redux";
import { addNote } from "store/note/note-slice";
import { useNavigate } from "react-router-dom";
export function NoteCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //creaction d'une nouvelle note dans le backend
  async function createNote(formValues) {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    //regiriger vers la page d'accueil automatiquement apres la soumission d'une note
    navigate("/");
    //console.log("*", createdNote);
  }
  return (
    <>
      <NoteForm title="Create a note" onSubmit={createNote} />
    </>
  );
}
