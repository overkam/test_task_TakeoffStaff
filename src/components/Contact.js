import "./Contact.css";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from '@material-ui/core/Button';

const Contact = (props) => {
  const [edit, setEdit] = useState(null);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");

  const onDeleteContact = (id) => {
    props.deleteContact(id, props.loggedPerson);
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
          <p className="searching-contact-name">{props.name}</p>
          <p>Phone number: {props.phone}</p>
        </div>
      ) : (
        <form onSubmit={onEditContact}>
          <div className='contact-name-wrapper' >
            <p className="contact-name">{props.name}</p>
            {edit !== null ? (            
              <div>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input
                  id="component-simple"
                  value={inputNameValue}
                  onChange={(e) => setInputNameValue(e.target.value)}
                  label="Name"
                />
              </div>
            ) : null}
          </div>
          <div className='contact-phone-wrapper' >
            <p className='contact-phone' >Phone number: {props.phone}</p>
            {edit !== null ? (
              <div>
              <InputLabel htmlFor="component-simple">Phone</InputLabel>
                <Input
                  id="component-simple"
                value={inputPhoneValue}
                onChange={(e) => setInputPhoneValue(e.target.value)}
                  label="Phone"
                />
              </div>
            ) : null}
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => onDeleteContact(props.id)}
          >
            <DeleteIcon />
          </IconButton>
          {edit === null ? (
            <Button onClick={() => setEdit(props.id)}> edit </Button>
          ) : (
            <Button type="submit">set contact</Button>
          )}
        </form>
      )}
    </div>
  );
};

export default Contact;
