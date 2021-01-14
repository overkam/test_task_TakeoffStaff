import ContactContainer from "./ContactContainer";
import React, { useState } from "react";

const Contacts = (props) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");
  const [searchingContact, setSearchingContact] = useState(null);
  let contactsElements;

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
      let isAlert = true
      props.loggedPerson.contacts.forEach((el) => {
        if (el.name === inputSearchValue || el.phone === inputSearchValue) {
          setSearchingContact(el);
          isAlert = false
        }
      });

      if (isAlert) {alert('No such contacts')}
      setInputSearchValue("");
    }
  };

  return (
    <div>
      <button onClick={props.logout}>Log out</button>
      <h2>Your contacts:</h2>
      <form onSubmit={onSearchContact}>
        <input
          palceholder="name/phone"
          value={inputSearchValue}
          onChange={(e) => setInputSearchValue(e.target.value)}
        />
        {searchingContact === null ? <button type="submit">Search contact</button> : <button onClick={() =>setSearchingContact(null) } >Cancel</button> }
      </form>
      {searchingContact !== null ? (
        <ContactContainer
          key={Date.now()}
          id='searchingContact'
          name={searchingContact.name}
          phone={searchingContact.phone}
        />
      ) : null}
      <form onSubmit={onAddContact}>
        <input
          palceholder="name"
          value={inputNameValue}
          onChange={(e) => setInputNameValue(e.target.value)}
        />
        <input
          palceholder="phone"
          value={inputPhoneValue}
          onChange={(e) => setInputPhoneValue(e.target.value)}
        />
        <button type="submit">Add contact</button>
      </form>
      <div> {contactsElements} </div>
    </div>
  );
};

export default Contacts;
