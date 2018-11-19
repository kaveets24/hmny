import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>
      default:
        return <li><a href="/api/logout">Logout</a></li>
    }
  }

  render() {
    console.log('some auth', this.props);

    return (
      <nav>
        <div className="nav-wrapper">
          <a id="hmny" className="left brand-logo" href="/">
            hmny
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// auth is equal to state.auth
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
