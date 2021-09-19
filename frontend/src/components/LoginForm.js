
import React, { useState } from 'react';
import { post } from '../utils/baseRequest';

const loginContainer = {
    display: 'flex',
    flexDirection: 'column', 
    width: '300px'
}

const LoginForm = () => {
    const [emailInput, setEmailInput] = useState(null);
    const [usernameInput, setUsernameInput] = useState(null);
    const [passwordInput, setPasswordInput] = useState(null);

    const pullFormInput = async () => {
        const inputs = {
            email: emailInput,
            username: usernameInput,
            password: passwordInput
        }
        await post('auth/login', inputs);
    };

    return (
        <div style={loginContainer}>
            <label for="Email">Email</label>
            <input onChange={(e) => setEmailInput(e.target.value)} type="text" id="Email" name="Email"></input>

            <label for="Username">Username</label>
            <input onChange={(e) => setUsernameInput(e.target.value)} type="text" id="Username" name="Username"></input>
            
            <label for="Password">Password</label>
            <input onChange={(e) => setPasswordInput(e.target.value)} type="text" id="Password" name="Password"></input>

            <button type="btn" onClick={() => {pullFormInput()}}>Submit</button>
        </div>
    );
}

export default LoginForm;