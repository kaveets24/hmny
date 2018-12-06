import React, { Component } from "react";
import { connect } from "react-redux"; // gives certain components ability to call action creators.
import * as actions from "../actions";

//  components
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Player from "./Player";
import Playlists from "./Playlists";
import Welcome from "./Welcome";

class App extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return null;
        
      case false:
        return <Welcome />
                
      default:
        return <Player />
    }
  }
  componentDidMount() {
    this.props.fetchUser();
  } // determines if the user is logged in
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <div className="main">
            <Route exact path="/playlists" component={Playlists} />
            {this.renderContent()}
            </div>       
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps, actions)(App); // first arg is mapStateToProps, 2nd arg is the action creators we want to wire up.
