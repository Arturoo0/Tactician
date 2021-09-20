
import React, { useState } from 'react';
import { LoginForm, SignupForm } from '../components';

const authContainerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
};

const switchFormButtonStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1rem'
};

const Login = () => {
    const [selectedOption, setSelectedOption] = useState('login');

    const renderAuthContainer = () => {
        if (selectedOption === 'login') return <LoginForm />
        else return <SignupForm />
    };  

    return (
        <div style={authContainerStyle}>     
            <div>
                <button style={
                    {
                        ...switchFormButtonStyle,
                        borderRight: '2px solid #ddd'
                    }
                } onClick={() => setSelectedOption('login')}>Login</button>
                <button style={switchFormButtonStyle} onClick={() => setSelectedOption('signup')}>Signup</button>
            </div>
            <div>
                {renderAuthContainer()}
            </div>
        </div>
    );
}; 

export default Login;