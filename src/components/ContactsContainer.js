import { connect } from 'react-redux'
import Contacts from './Contacts'
import { addContactCreator, searchContactCreator, logoutCreator } from "../redux/login-reducer";

const mapStateToProps = (state) => {
  return {
    loggedPerson: state.loggedPerson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutCreator()),
    addContact: (name, phone, username) => dispatch(addContactCreator(name, phone, username)),
    searchContact: (value) => dispatch(searchContactCreator(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)