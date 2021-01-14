import { connect } from 'react-redux'
import Login from './Login'
import { loginCheckCreator } from "../redux/login-reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(loginCheckCreator(username, password))
  }
}

export default connect(null, mapDispatchToProps)(Login)