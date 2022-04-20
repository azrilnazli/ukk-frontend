import React from 'react';
import { Button, Navbar, NavbarBrand, Container,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';


const NavbarMenu = (

    {

        authLink,
        loggedIn,
        logout,
        NavLink: NavLink,
        ...rest
    }

) => {

    let None = null

    const homeLink = loggedIn 
    ? <NavLink as={Link} to='/dashboard' className="nav-link">Dashboard</NavLink> 
    : <NavLink as={Link} to='/home' className="nav-link">Home</NavLink>

    const moviesLink = loggedIn 
    ? <NavLink as={Link} to='/movies' className="nav-link">Movies</NavLink> 
    : null

    const accountLink = loggedIn 
    ?  
    
    <NavDropdown 
               
    title={
        <span>
            <i className="fa fa-lock" aria-hidden="true"></i> My Account
        </span>
    }
    
    >
        <NavDropdown.Item >
            <NavLink as={Link} to='/my_account' className="dropdown-item"><i className="fa fa-user" aria-hidden="true"></i> Profile</NavLink> 
        </NavDropdown.Item>
        <NavDropdown.Item >
            <NavLink as={Link} to='/change_password' className="dropdown-item"><i className="fa fa-lock" aria-hidden="true"></i> Password</NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item >
           
        </NavDropdown.Item>
        
        <NavDropdown.Divider />
        <NavDropdown.Item >
            {/* <LogoutLink logout={logout}/> */}
            <NavLink as={Link} to='/home' onClick={logout} className="dropdown-item"><i className="fa fa-share-square" aria-hidden="true"></i> Logout</NavLink>
        </NavDropdown.Item>
    </NavDropdown>
    : 
    null


  

     return ( 
        // <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-3">
        // <a className="navbar-brand" href="/"><i className="fa fa-cog fa-spin"></i> React Flix</a>
        // <div className="collapse navbar-collapse" id="navbarSupportedContent">
        // <ul className="navbar-nav">
        //     <li className="nav-item text-light">
        //         {homeLink}
        //     </li>
        //     <li className="nav-item text-light">
        //         {moviesLink}
        //     </li>
        // </ul>
        
        // <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        // <li className="nav-item">
  
        //          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //              <NavDropdown.Divider />
        //              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //             </NavDropdown>
        // </li>
        //     <li className="nav-item">
        //         {accountLink}
        //     </li>
        //     <li className="nav-item">
        //         {authLink}
        //     </li>
        // </ul>
        // </div>
        // </nav>


            <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">UKK RTM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {homeLink}
                    {moviesLink}
                </Nav>
                <Nav>
                {accountLink}
                {authLink}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

    );
}
export default NavbarMenu
