import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { NoteAPI } from "api/note-api";
import { updateNote } from "store/note/note-slice";
import { deleteNote } from "store/note/note-slice";
export function Note(props) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  //recuperer les parametres dans l'url
  const { noteId } = useParams();
  console.log("***", noteId);

  //aller chercher dans le store la note correspondante a cette id et la recuperer
  const note = useSelector(store =>
    store.NOTE.noteList.find(note => note.id === noteId),
  ); //la fonction find retourne l'objet qui match les conditions qu'elle a presentees
  console.log("*", note);

  async function submit(formValues) {
    const updatedNote = await NoteAPI.update({ ...formValues, id: note.id });
    //appiliquer cette modification au store
    dispatch(updateNote(updatedNote));
    setIsEditable(false); //quant on clique sur submit on passe directement en mode non editable
  }

  const navigate = useNavigate();

  function deletNote_(note) {
    if (window.confirm("supprimer la note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edite note" : note.title}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)} //isEditable est a false par defaut donc ici quand on clique sur l'icon de modiification si elle est true est se change a false et vise vers ca
          onClickTrash={() => deletNote_(note)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
