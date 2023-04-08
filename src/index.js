import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { StrictMode } from "react";
//pour associer les pages a  des url
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import { Note } from "pages/Note/Note";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/*associer des url aux pages quand on a creees a l'aide des routes*/}
    <BrowserRouter>
      <Routes>
        {/* creer une route parente qui rendre app w puisque app contient outlet dans a chaque fois on change l'url l'element outlet se remplace par le composant correspendant a l'url*/}
        <Route path="/" element={<App />}>
          <Route path="/" element={<NoteBrowse />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="/note/new" element={<NoteCreate />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
