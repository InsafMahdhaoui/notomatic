import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteAPI } from "api/note-api";
import { deleteNote } from "store/note/note-slice";
export function NoteList({ noteList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function deletNote_(note) {
    if (window.confirm("supprimer la note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
    }
  }
  return (
    <div className={"row justify-content-center"}>
      {noteList.map(note => {
        return (
          <div key={note.id} className={s.card_container}>
            <TextCard
              title={note.title}
              subtitle={note.created_at}
              content={note.content}
              onClick={() => navigate("/note/" + note.id)}
              onClickTrash={() => deletNote_(note)}
            />
          </div>
        );
      })}
    </div>
  );
}
