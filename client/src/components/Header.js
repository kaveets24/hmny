import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Header extends Component {

  renderNav() {
    switch (this.props.auth) {
      case null:
        return null
      case false:
        return <a className="header__a" href="/auth/google">Login</a>
      default:
        return (
          <div>
            <Link className="header__a" to="/playlists">Playlists</Link>
            <Link className="header__a" to="#settings">Settings</Link>
            <a className="header__a" href="/api/logout">Logout</a>
          </div>
        )
        
        
    }
  }

  render() {
    console.log('some auth', this.props);

    return (
      <header className="header">
        <Link to="/" className="header__hmny header__a">Hmny</Link>
        <nav className="rightnav">
          {this.renderNav()}
        </nav>      
      </header>
    );
  }
}

// auth is equal to state.auth
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
