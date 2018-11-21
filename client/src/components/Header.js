import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null
      case false:
        return <a className="header__a" href="/auth/google">Login</a>
      default:
        return (
          <div>
            <a className="header__a" href="#playlists">Playlists</a>
            <a className="header__a" href="#settings">Settings</a>
            <a className="header__a" href="/api/logout">Logout</a>
          </div>
        )
        
        
    }
  }

  render() {
    console.log('some auth', this.props);

    return (
      <header className="header">
        <a href="/" className="header__hmny header__a">Hmny</a>
        <nav className="rightnav">
          {this.renderContent()}
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
