
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const signoutContainerStyle = { 
    backgroundColor: 'white',
};

const redirectToAuth = () => {
    window.location.pathname = '/auth';
};

const SignedOut = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>You are currently signed out.</Card.Title>
                <Button onClick={() => {redirectToAuth()}} variant="primary">Sign in</Button>
            </Card.Body>
        </Card>
    );
};

export default SignedOut;