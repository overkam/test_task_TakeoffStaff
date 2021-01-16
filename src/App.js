import './App.css';
import LoginContainer from './components/LoginContainer';
import ContactsContainer from './components/ContactsContainer';

const App = (props) => {
  props.checkLoggedUser()

  return (
    <div className='app-wrapper'>
    {props.loggedPerson.hasOwnProperty('id') ? <ContactsContainer /> : <LoginContainer /> }
    </div>
  );
}

export default App;
