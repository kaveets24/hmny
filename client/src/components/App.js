import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Player from "./Player";
import { connect } from "react-redux"; // gives certain components ability to call action creators.
import * as actions from "../actions";

// dummy components

// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  } // determines if the user is logged in
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/"/>
            <Route exact path="/listen" component={Player} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App); // first arg is mapStateToProps, 2nd arg is the action creators we want to wire up.
