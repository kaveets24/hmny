import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="">
          <a className="" href="/">hmny</a>
          <ul className="">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
