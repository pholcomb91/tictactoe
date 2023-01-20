import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkPassword, validateEmail } from '../utils/validation';
import AuthService from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";


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
    <div>
        <h1>Welcome Stranger, would you like to lose a game of Smack Talk, Toe?</h1>
        {data ? (
              <Link to="/homepage">Let's do this!</Link>
            ) : (
            <form onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="Your Username"
                    name="userName"
                    type="text"
                    value={userFormData.userName}
                    onChange={handleInputChange}
                />
                <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                />
                <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                />  
                <button
                    className="btn btn-block btn-info"
                    style={{ cursor: 'pointer' }}
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
    );
}

export default SignUp;