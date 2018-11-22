import React, { Component } from "react";
import { connect } from "react-redux"; // gives certain components ability to call action creators.
import * as actions from "../actions";

//  components
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Player from "./Player";
import Playlists from "./Playlists";


// dummy components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  renderPlayer() {
    switch(this.props.auth) {
      case null:
        return null
      case false:
        return null;
        
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
            {this.renderPlayer()}
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
