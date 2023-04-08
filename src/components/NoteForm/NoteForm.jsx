import s from "./style.module.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useState } from "react";
import { ValidatorService } from "services/form-validators";
import { FieldError } from "components/FieldError/FieldError";

const VALIDATORS = {
  title: value => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: value => {
    return ValidatorService.min(value, 3);
  },
};
//console.log(VALIDATORS.title("HI"));
export function NoteForm({
  title,
  note,
  onClickEdit,
  onClickTrash,
  onSubmit,
  isEditable = true,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "", //si note est defini si on a envoyer une note en parametres alors title prend le title de note
    content: note?.content || "", //si note est defini si on a envoyer une note en parametres alors content prend le content de note
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : "",
    content: note?.content ? undefined : "",
  });

  //fonction de disable le button submit au presence d'une erreur
  function hasError() {
    //object.values transforme les donnees en un tableau
    return Object.values(formErrors).some(
      error => error !== undefined,
    ); /*si un element match le predicat ecrit dans some cette fnction retourne true 
    sinon si aucun des elements du tableau n'est pas equivalent au predicat citee dans some il va retourner false*/
  }

  //fonction de validation
  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }
  //console.log("**", formErrors);
  //cette fonctioncontrole en permenance ce qu'on tape dans les inputs pour savoir les nombre de caracteres tapees pour qu'on puiss gerer les verifications ensuite
  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }
  const actionIcons = (
    <>
      <div className="col-1">
        {/*Les icons n'apparaissent que lorsque les evenements de edit ou suppression sont envoyees depuis une autre interface biensure*/}
        {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickTrash && (
          <TrashFill onClick={onClickTrash} className={s.icon} />
        )}
      </div>
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitButton = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <form className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? contentInput : <pre>{note.content}</pre>}{" "}
        {/*la balise <pre> sert a garder les retours a la ligne dans les paragrapes   */}
      </div>
      {/* si isEditable est a true alors afficher le content input sinon afficher note.content(le contenue du note) */}
      {onSubmit && submitButton}
    </form>
  );
}
