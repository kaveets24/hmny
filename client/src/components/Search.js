import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.overlay = React.createRef();
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

  handleClick = () => {
    this.setState({overlay: true})
  }


  render() {
    let overlayClassName = this.state.overlay ? `search__results`: `search__results search__results--hidden`;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            onClick={this.handleClick}
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
        <div ref={this.overlay} className={overlayClassName}>

        </div>
      </div>
    );
  }
}

export default Search;
