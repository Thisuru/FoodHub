import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class AppNavbar extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  loginAsUser() {      
    this.props.auth.loginAsUser();    
  }

  loginAsShopOwner() {      
    this.props.auth.loginAsShopOwner();
  }


  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isLoggedIn } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <img src="https://i.ibb.co/fxhBdkJ/orange.png" width="50px" />
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          {
              !isAuthenticated() && (
                !isLoggedIn() && (
              <NavItem eventKey={1} onClick={this.loginAsUser.bind(this)}>
                Log In as a User
              </NavItem>
                
                  )
                  
                )
           }
          {
              !isAuthenticated() && (
                !isLoggedIn() && (
              <NavItem eventKey={2} onClick={this.loginAsShopOwner.bind(this)}>
                  Log In as a ShopOwner
             </NavItem>  
                  )
                  
                )
           }
           {
              isAuthenticated() && (
                isLoggedIn() &&  
                (<NavItem eventKey={3} onClick={this.logout.bind(this)} >
                    Log Out
                  </NavItem>)
                )
            }
         
          </Nav>       
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;