import { useState } from "react";
import "./Login.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Button from "@material-ui/core/Button";

const Login = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const useStyles = makeStyles({
    textField: {
      margin: "0 0 10px",
    },
    button: {
      width: "150px",
      height: "40px",
      margin: "20px auto"
    },
  });

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickLogin = (e) => {
    e.preventDefault();

    if (values.username.trim() && values.password.trim()) {
      props.loginUser(values.username, values.password);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>LOG IN</h1>
      <TextField
        id="standard-basic"
        label="Username"
        className={classes.textField}
        value={values.username}
        onChange={handleChange("username")}
      />

      <FormControl className={classes.textField}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickLogin}
        className={classes.button}
      >
        Log in
      </Button>
    </div>
  );
};

export default Login;
