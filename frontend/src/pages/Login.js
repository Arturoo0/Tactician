
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
    backgroundColor: 'white'
};

const switchContainer = {
    display: 'flex',
    flexDirection: 'row'
};

const whiteContainer = {
    backgroundColor: 'white'
}

const Login = () => {
    const [selectedOption, setSelectedOption] = useState('login');

    const renderAuthContainer = () => {
        if (selectedOption === 'login') return <LoginForm />
        else return <SignupForm />
    };  

    const isSelected = (action) => {
        if (selectedOption === action)
            return { opacity: '.7' }
    };

    return (
        <div style={authContainerStyle}>     
            <div style={switchContainer}>
                <div style={{...whiteContainer, ...isSelected('login')}}>
                    <button style={
                        {
                            ...{
                                ...switchFormButtonStyle,
                                borderRight: '2px solid #ddd'
                            }
                        }
                    } 
                    onClick={() => setSelectedOption('login')}>Login</button>
                </div>
                <div style={{...whiteContainer, ...isSelected('signup')}}>
                    <button style={switchFormButtonStyle} onClick={() => setSelectedOption('signup')}>Signup</button>
                </div>
            </div>
            <div>
                {renderAuthContainer()}
            </div>
        </div>
    );
}; 

export default Login;