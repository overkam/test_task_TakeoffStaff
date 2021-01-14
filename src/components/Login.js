import { useState } from 'react'

const Login = (props) => {
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault()

    if (inputUserValue.trim() && inputPasswordValue.trim()) {
      props.loginUser(inputUserValue, inputPasswordValue);
      setInputUserValue("");
      setInputPasswordValue("");
    }
  }



  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={submitHandler}>
        <input
          type="username"
          placeholder="username"
          value={inputUserValue}
          onChange={(e) => setInputUserValue(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={inputPasswordValue}
          onChange={(e) => setInputPasswordValue(e.target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
