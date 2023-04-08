import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { NoteList } from "container/NoteList/NoteList";
import { SearchBar } from "components/SearchBar/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function NoteBrowse(props) {
  //une state qui control et sauvgarde en permenance le texte qui se tape en search bar  pour qu'en utilise dans le filtrage
  const [searchText, setSearchText] = useState("");
  console.log("****", searchText);

  //creer un filer pour filtrer les notes selon ce qui est dans le search bar
  //tout d'abord il faut recuperer du store la liste des notes
  const noteList = useSelector(store => store.NOTE.noteList);
  //rechercher selon le title
  const filteredList = noteList.filter(note => {
    const containsTitle = note.title
      .toUpperCase()
      .includes(searchText.trim().toUpperCase()); //verifier si le titre de note en majuscule appartient a la searchText en si elle est en majuscule // .trim() retire les espaces

    //rechercher selon le content
    const containsContent = note.content
      .toUpperCase()
      .includes(searchText.trim().toUpperCase());
    return containsTitle || containsContent;
  });
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            placeholder="Search a note..."
            onTextChange={setSearchText}
          />
        </div>
      </div>

      {/* verifier quant est ce que on a plus des notes */}
      {noteList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>
            Vous n'avez pas de notes, voulez vous en{" "}
            <Link to="/note/new">creer une </Link>{" "}
          </span>
        </div>
      )}
      <NoteList noteList={filteredList} />
    </>
  );
}
