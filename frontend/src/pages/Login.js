
import React from 'react';
import { LoginForm, SignupForm } from '../components';

const loginContainer = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
};

const Login = () => {
    return (
        <div style={loginContainer}>
            <LoginForm />
            <SignupForm />
        </div>
    );
}; 

export default Login;