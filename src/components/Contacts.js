import "./Contacts.css";
import ContactContainer from "./ContactContainer";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const Contacts = (props) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");
  const [searchingContact, setSearchingContact] = useState(null);
  let contactsElements;

  const useStyles = makeStyles({
    textField: {
      margin: "0 0 10px",
    },
    logoutButton: {
      width: "100px",
      height: "30px",
      margin: "20px 0 0 0",
      border: 'none !important'
    },
    addContactButton: {
      width: "50px",
      height: "30px",
      right: "0",
      bottom: "0",
      position: "absolute",
    },
    searchContactButton: {
      width: "50px",
      height: "30px",
      right: "0",
      bottom: "0",
      position: "absolute",
    },
  });

  const classes = useStyles();

  contactsElements = props.loggedPerson.contacts.map((el, i) => (
    <ContactContainer key={i} id={el.id} name={el.name} phone={el.phone} />
  ));

  const onAddContact = (e) => {
    e.preventDefault();

    if (inputNameValue.trim() && inputPhoneValue.trim()) {
      props.addContact(
        inputNameValue,
        inputPhoneValue,
        props.loggedPerson.username
      );
      setInputNameValue("");
      setInputPhoneValue("");
    }
  };

  const onSearchContact = (e) => {
    e.preventDefault();

    if (inputSearchValue.trim()) {
      let isAlert = true;
      props.loggedPerson.contacts.forEach((el) => {
        if (el.name === inputSearchValue || el.phone === inputSearchValue) {
          setSearchingContact(el);
          isAlert = false;
        }
      });

      if (isAlert) {
        alert("No such contacts");
      }
      setInputSearchValue("");
    }
  };

  return (
    <div>
      <div className="contacts-header">
        <h2>YOUR CONTACTS:</h2>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.logout}
          className={classes.logoutButton}
        >
          Log out
        </Button>
      </div>
      <div className="search-add-wrapper">
        <form onSubmit={onAddContact}>
        <p>ADD CONTACT</p>
          <div className="add-inputs-wrapper">
            <Input
              className={classes.textField}
              placeholder="Name"
              value={inputNameValue}
              onChange={(e) => setInputNameValue(e.target.value)}
            />
            <Input
              className={classes.textField}
              placeholder="Phone"
              value={inputPhoneValue}
              onChange={(e) => setInputPhoneValue(e.target.value)}
            />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              className={classes.addContactButton}
            >
              add
            </Button>
          </div>
        </form>
        <form onSubmit={onSearchContact}>
        <p>SEARCH CONTACT</p>
          <div className="search-contact-wrapper">
            <Input
              className={classes.textField}
              placeholder="Name/Phone"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.target.value)}
            />
            {searchingContact !== null ? (
              <ContactContainer
                key={Date.now()}
                id="searchingContact"
                name={searchingContact.name}
                phone={searchingContact.phone}
              />
            ) : null}
            {searchingContact === null ? (
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                className={classes.searchContactButton}
              >
                search
              </Button>
            ) : (
              <Button
                variant="outlined"
                className={classes.searchContactButton}
                onClick={() => setSearchingContact(null)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="contact-elements-wrapper"> {contactsElements} </div>
    </div>
  );
};

export default Contacts;
