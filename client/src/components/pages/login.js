import React from "react";

function Login () {
    return (
        <>
            <h1>Welcome Stranger, would you like to lose a game of Smack Talk, Toe?</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your Username"
                  name="userName"
                  type="text"
                  value={formState.userName}
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
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Sign Up
                </button>
            </form>
        </>
    )
}

export default Login