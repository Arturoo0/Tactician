
import React from 'react';
import { LoginForm } from '../components';

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
        </div>
    );
}; 

export default Login;