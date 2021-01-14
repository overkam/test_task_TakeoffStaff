import { connect } from 'react-redux'
import App from './App'

const mapStateToProps = (state) => {
  return {
    loggedPerson: state.loggedPerson
  }
}


export default connect(mapStateToProps, null)(App)
