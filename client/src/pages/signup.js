import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkPassword, validateEmail } from '../utils/validation';
import AuthService from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";

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

function SignUp () {
    // default state
    const [userFormData, setUserFormData] = useState({ userName: '', email: '', password: '' })
    const [error, setError] = useState('');
    const [addUser, { data }] = useMutation(ADD_USER);

    
    const handleInputChange = (e) => {
        // setting up semantic variable to use
       const { name, value } = e.target;
       setUserFormData({...userFormData, [name]: value});
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(userFormData.email)) {
            setError('Email of username is in valid');
            return;
        }
        if (!checkPassword(userFormData.password)) {
            setError(`Choose a more secure password ${userFormData.userName}`);
            return;
        }
        console.log(userFormData)
        // adding the user to the database
        try {
            const { data } = await addUser({
                variables: {userFormData}
            });
            AuthService.login(data.addUser.token)
        } catch (err) {
            console.error(err);
        };
        // resetting the form
            setUserFormData({
                userName: '',
                email: '',
                password: ''
            });
            setError('');

    }
    return (
    <div className="d-flex justify-content-center container">
        <div className="row d-flex justify-content-center">
            <h1 className='text-center col-12' style={styles.h1}>Welcome Stranger, would you like to lose a game of Smack Talk Toe?</h1>
            {data ? (
                <Link to="/homepage">Let's do this!</Link>
                ) : (
                <form onSubmit={handleFormSubmit} style={styles.form} className="d-flex justify-content-center col-6">
                    <div className="m-1">
                    <input 
                    placeholder="Username"
                    name="userName"
                    type="text"
                    value={userFormData.userName}
                    onChange={handleInputChange} 
                    className="form-control" 
                    />
                    </div>
                    <div className="m-1">
                    <input 
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={userFormData.email}
                    onChange={handleInputChange} 
                    className="form-control" 
                    />
                    </div>
                    <div className="m-1">
                    <input 
                    placeholder="******"
                    name="password"
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    />
                    </div>  
                    <button
                        className="btn btn-info"
                        style={styles.btn}
                        type="submit"
                    >
                        SignUp
                    </button>
                </form>
                )}
            {error && (
                <div>
                    <p className="error-text">{error}</p>
                </div>
            )}
        </div>
    </div>
    );
}

export default SignUp;