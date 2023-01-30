import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER} from '../utils/mutations';
import AuthService from '../utils/auth';

const styles = {
  h1: {
    color: "whitesmoke",
  },
  form: {
    border: "2px ",
    borderRadius: "5px",
    margin: "5px"
  },
  input: {
    background: "#c3d898",
    color: "#70161e",
  },
  btn: {
    color: "black",
    background: "#858585",
    borderColor: "black"
  },
  button: {
    color: "black",
    background: "#858585",
    borderColor: "black",
    width: "10%"
  }
}

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      AuthService.login(data.login.token);
    } catch (e) {
      console.log(e);
    }
    console.log(formState)
    setFormState({
      email: '',
      password: '',
    });
  };

    return (
      <div className="d-flex justify-content-center container">
        <div className="row d-flex justify-content-center">
            <h1 className='text-center col-12' style={styles.h1}>Welcome Stranger, would you like to lose a game of Smack Talk Toe?</h1>
            {data ? (
              <Link to="/homepage">Take me Home</Link>
            ) : (
            <form onSubmit={handleFormSubmit} style={styles.form} className="d-flex justify-content-center">
                <div className="m-1">
                  <input 
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange} 
                  className="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp"
                  />
                </div>
                <div className="m-1">
                  <input 
                  placeholder="******"
                  name="password"
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1"
                  value={formState.password}
                  onChange={handleChange}
                  />
                </div> 
                <Link
                  className="btn btn-info m-1"
                  style={ styles.btn }
                  type="submit"
                  to="/homepage"
                >
                  Login
                </ Link>
            </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error}
              </div>
            )}
            <h2 className='text-center' style={styles.h1}>Or</h2>
            <div className='d-flex justify-content-center'>
              <button
                  className="btn btn-block btn-info"
                  style={styles.button}
                ><a href='/signup' style={styles.button}>Sign Up</a>
              </button>
            </div>
        </div>
      </div>
    )
}

export default Login