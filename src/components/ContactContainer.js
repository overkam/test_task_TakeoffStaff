import { connect } from 'react-redux'
import Contact from './Contact'
import { deleteContactCreator, editContactCreator } from "../redux/login-reducer";

const mapStateToProps = (state) => {
  return {
    loggedPerson: state.loggedPerson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (id, user) => dispatch(deleteContactCreator(id, user)),
    editContact: (id, name, phone, user) => dispatch(editContactCreator(id, name, phone, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)