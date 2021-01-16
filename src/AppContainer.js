import { connect } from "react-redux";
import App from "./App";
import { checkUser } from "./redux/login-reducer";

const mapStateToProps = (state) => {
  return {
    loggedPerson: state.loggedPerson,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoggedUser: () => dispatch(checkUser())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
