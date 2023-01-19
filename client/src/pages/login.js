import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER} from '../utils/mutations';
import AuthService from '../utils/auth';

const styles = {
  a: {
    textdecoration: "none",
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
        <div>
            <h1>Welcome Stranger, would you like to lose a game of Smack Talk, Toe?</h1>
            {data ? (
              <p><Link to="%PUBLIC_URL%/homepage">Take me Home</Link></p>
            ) : (
            <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />  
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
                </button>
            </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error}
              </div>
            )}
            <h2>Or</h2>
            <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                ><a href='/signup' style={styles.a}>Sign Up</a>
            </button>
        </div>
    )
}

export default Login