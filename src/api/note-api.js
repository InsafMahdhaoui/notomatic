//cette classe sert a faire tout les appels http
//c'est notre api

import axios from "axios";

const BASE_URL = "http://localhost:3200/notes";

export class NoteAPI {
  //creer une note
  static async create(note) {
    return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
  }
  //afficher toutes les notes
  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }
  //recuperer une seule note
  static async fetchById(noteId) {
    return this.formatId((await axios.get(`${BASE_URL}/${noteId}`)).data);
  }
  //supprimer une note
  static async deleteById(noteId) {
    return this.formatId((await axios.delete(`${BASE_URL}/${noteId}`)).data);
  }
  //modifier une note
  static async update(note) {
    return this.formatId(
      (await axios.patch(`${BASE_URL}/${note.id}`, note)).data,
    );
  }

  static formatId(note) {
    return { ...note, id: note.id.toString() };
  }
}
