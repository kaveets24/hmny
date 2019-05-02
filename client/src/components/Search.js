import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      overlay: false,
 
    };
  }


  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
  };

  handleSubmit = () => {
    // make a request to fetch search query (results limited to 20)
  };

  showOverlay = () => {
    this.setState({overlay: true})
  }
  hideOverlay = () => {
    this.setState({overlay: false})
  }


  render() {
    let overlayClassName = this.state.overlay ? `search__results`: `search__results search__results--hidden`;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            onClick={this.showOverlay}
            value={this.state.inputText}
            type="text"
            placeholder="Search for more tracks..."
          />
          <fieldset>
            <div className="search__radio-fields">
              <input type="radio" value="spotify" id="spotify" name="music-service" />
              <label for="spotify">Spotify</label>
              <input type="radio" value="youtube" id="youtube" name="music-service" />
              <label for="youtube">Youtube</label>
              <input type="radio" value="soundcloud" id="soundcloud" name="music-service" />
              <label for="soundcloud">Soundcloud</label>
            </div>
          </fieldset>
        </form>
        <div className={overlayClassName}>
          <div onClick={this.hideOverlay} className="search__results-button">
            <i className="fa fa-window-close"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
