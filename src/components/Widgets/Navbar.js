import React from 'react';
import { Button, Navbar, NavbarBrand, Container,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';
import config from '../../config.json';


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

    // const moviesLink = loggedIn 
    // ? <NavLink as={Link} to='/movies' className="nav-link">Movies</NavLink> 
    // : null

    const MyCompanyLink = loggedIn 
    ? <NavLink as={Link} to='/my_company' className="nav-link">My Company</NavLink> 
    : null

    const MyProposalLink = loggedIn 
    ? <NavLink as={Link} to='/my_proposal' className="nav-link">My Proposal</NavLink> 
    : null

    const MyTenderLink = loggedIn 
    ? <NavLink as={Link} to='/my_tender' className="nav-link">My Tender</NavLink> 
    : null

    const faqLink = loggedIn 
    ? <NavLink as={Link} to='/faq' className="nav-link">FAQ</NavLink> 
    : null


    const tenderLink = loggedIn ?  
    
    <NavDropdown 
                
        title={
            <span>
                <i className="fa fa-list" ></i> Proposal
            </span>
        }
        >
        <NavDropdown.Item >
            <NavLink as={Link} to='/tender/requirements' className="dropdown-item"><i className="fa fa-question" ></i> REQUIREMENTS</NavLink> 
        </NavDropdown.Item>
        <NavDropdown.Item >
            <NavLink as={Link} to='/tender/sambung_siri' className="dropdown-item"><i className="fa fa-search" ></i> SAMBUNG SIRI</NavLink> 
        </NavDropdown.Item>
        <NavDropdown.Item >
            <NavLink as={Link} to='/tender/swasta' className="dropdown-item"><i className="fa fa-search" ></i> SWASTA</NavLink> 
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item >
            <NavLink as={Link} to='/my_proposal' className="dropdown-item"><i className="fa fa-user" ></i> My Tender</NavLink>
        </NavDropdown.Item>
        
    </NavDropdown>
    : 
    null

    const accountLink = loggedIn ?  
    
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
        
        <NavDropdown.Divider />
        <NavDropdown.Item >
            {/* <LogoutLink logout={logout}/> */}
            <NavLink as={Link} to='/home' onClick={logout} className="dropdown-item"><i className="fa fa-share-square" aria-hidden="true"></i> Logout</NavLink>
        </NavDropdown.Item>
    </NavDropdown>
    : 
    null




     return ( 

            <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>{config.APP}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {homeLink}

                    {MyCompanyLink}

                    {tenderLink}
{/*                     
                    {MyProposalLink}
                    {MyTenderLink} */}
                    
                    {faqLink}
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
