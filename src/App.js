import './App.css';
import LoginContainer from './components/LoginContainer';
import ContactsContainer from './components/ContactsContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
    {props.loggedPerson === null ? <LoginContainer /> : <ContactsContainer />}
    </div>
  );
}

export default App;
