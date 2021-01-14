import { useState } from "react";

const Contact = (props) => {
  const [edit, setEdit] = useState(null);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");

  const onDeleteContact = (e) => {
    e.preventDefault();
    props.deleteContact(+e.target.parentElement.id, props.loggedPerson);
  };

  const onEditContact = (e) => {
    e.preventDefault();
    if (inputNameValue.trim() && inputPhoneValue.trim()) {
      props.editContact(
        edit,
        inputNameValue,
        inputPhoneValue,
        props.loggedPerson
      );
      setInputNameValue("");
      setInputPhoneValue("");
      setEdit(null);
    }
  };

  return (
    <div>
      {props.id === "searchingContact" ? (
        <div>
          <h4>{props.name}</h4>
          <p>Phone number: {props.phone}</p>
        </div>
      ) : (
        <form onSubmit={onEditContact} id={props.id}>
          <div>
            <h4>{props.name}</h4>
            {edit !== null ? (
              <input
                palceholder="name"
                value={inputNameValue}
                onChange={(e) => setInputNameValue(e.target.value)}
              ></input>
            ) : null}
          </div>
          <div>
            <p>Phone number: {props.phone}</p>
            {edit !== null ? (
              <input
                palceholder="phone"
                value={inputPhoneValue}
                onChange={(e) => setInputPhoneValue(e.target.value)}
              ></input>
            ) : null}
          </div>
          <button onClick={onDeleteContact}>delete</button>
          {edit === null ? (
            <button onClick={(e) => setEdit(+e.target.parentElement.id)}>
              edit
            </button>
          ) : (
            <button type="submit">set contact</button>
          )}
        </form>
      )}
    </div>
  );
};

export default Contact;
