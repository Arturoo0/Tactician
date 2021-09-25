
import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { post } from '../utils/baseRequest';

const PageNav = (path) => {
    const redirectPage = (path) => {
        window.location.pathname = path; 
    };

    const signout = () => {
        const response = post('/auth/signout'); 
    };

    return (
        <div>
            <Navbar bg="light" expand="lg" className='ms-auto'>
                <Navbar.Brand onClick={() => {redirectPage('/home')}}>Tactician</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => {redirectPage('/home')}}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            signout();
                            redirectPage('/auth');
                        }
                        }>
                            <Badge size={'sm'} bg="danger">Sign out</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default PageNav;