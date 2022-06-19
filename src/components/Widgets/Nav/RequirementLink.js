import React from 'react';
import apiClient from '../../../services/api';
import { Button, Navbar, NavbarBrand, Container,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router,Link,NavLink  } from 'react-router-dom';
import config from '../../../config.json';

const RequirementLink = () => {

    
    return (
        <>
                <NavDropdown 
                            
                    title={
                        <span>
                            <i className="fa fa-list-alt" ></i> Tender
                        </span>
                    }
                    >

                    <NavDropdown.Item >
                        <NavLink as={Link} to='/tender-requirement' className="dropdown-item"><i className="fa fa-question text-uppercase" ></i> Swasta</NavLink> 
                    </NavDropdown.Item>

                    <NavDropdown.Item >
                        <NavLink as={Link} to='/requirement/sambung-siri' className="dropdown-item"><i className="fa fa-question text-uppercase" ></i> Sambung Siri</NavLink> 
                    </NavDropdown.Item>

                    <NavDropdown.Item >
                        <NavLink as={Link} to='/requirement/syndicated' className="dropdown-item"><i className="fa fa-question text-uppercase" ></i> Syndicated</NavLink> 
                    </NavDropdown.Item>

                    <NavDropdown.Item >
                        <NavLink as={Link} to='/requirement/finished-product' className="dropdown-item"><i className="fa fa-question text-uppercase" ></i> Finished Product</NavLink> 
                    </NavDropdown.Item>

                    
                </NavDropdown>
     
        </>
    );
};

export default RequirementLink;