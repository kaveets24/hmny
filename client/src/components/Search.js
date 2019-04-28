import React, { Component } from "react";

class Search extends Component {
  state = {
    inputText: ""
  };

  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
  };

  handleSubmit = () => {
    // make a request to fetch search query (results limited to 20)
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.inputText}
            type="text"
            placeholder="Search for more tracks..."
          />
          <fieldset>
            <div className="radio-fields">
              <input type="radio" value="spotify" id="spotify" name="music-service" />
              <label for="spotify">Spotify</label>
              <input type="radio" value="youtube" id="youtube" name="music-service" />
              <label for="youtube">Youtube</label>
              <input type="radio" value="soundcloud" id="soundcloud" name="music-service" />
              <label for="soundcloud">Soundcloud</label>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Search;
