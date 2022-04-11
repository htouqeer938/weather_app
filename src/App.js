import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/actions";

class App extends Component {
  state = {
    name: "",
  };

  handleOnClick = (event) => {
    event.preventDefault();
    this.props.cityLocation(this.state.name);
  };

  nameChangleHandler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    // debugger
    return (
      <div>
        <form onSubmit={this.handleOnClick}>
          <label>Weather </label>
          <input
            placeholder="Weather"
            value={this.state.name}
            onChange={(event) => this.nameChangleHandler(event)}
          />

          <input type="submit" />

          <div>
            <br />
            <br />
            <div>
              <label>Location : </label>
              {this.props.location}
            </div>
            <br />
            <div>
              <label>Temperature : </label>
              {/* {this.props.data} */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  location: state.data.location,
  temperatures: state.data.temperature,
  hasErrors: state.hasErrors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    cityLocation: (text) => {
      dispatch(actions.fetchPosts(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
