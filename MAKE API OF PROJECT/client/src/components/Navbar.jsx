import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
    return null;  // to prevent page refresh after logout
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Fullstack Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ?
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
                {user?.role === 'Admin' &&
                  < Link className="nav-link" to="/table">Users Details</Link>
                }
              </>
              :
              <>
                <Link className="nav-link" to="/signup">Sign Up</Link>
                <Link className="nav-link" to="/login">Login</Link>
              </>
            }
          </Nav>
          {user ? (
            <Nav className="ml-auto  w-25 flex align-items-center justify-content-between">
              <Button className="btn btn-secondary" onClick={logoutHandler}>Logout</Button>
              <p className='text-white pt-3'>Hello: {user.username.slice(0, 10) + " ..."}</p>
            </Nav>
          ) : null
          }
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default CustomNavbar;
