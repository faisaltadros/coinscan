import React from "react";
import { BallBeat } from "react-pure-loaders";

import "./Loader.css";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div id="my-container" className="ui grid middle aligned">
        <div className="row">
          <div className="column">
            <div className="ui centered grid ">
              <BallBeat color={"#000000"} loading={this.state.loading} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
