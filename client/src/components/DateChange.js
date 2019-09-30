import React, { Component } from "react";

export class DateChange extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click = time => {
    this.props.parentMethod(time);
  };

  render() {
    return (
      <div className="ui five item menu">
        <button onClick={() => this.click(86400)} className="item">
          Today
        </button>
        <button onClick={() => this.click(604800)} className="item">
          Last Week
        </button>
        <button onClick={() => this.click(2678400)} className="item">
          Last Month
        </button>
        <button onClick={() => this.click(31536000)} className="item">
          Last Year
        </button>
        <button onClick={() => this.click(9999999999999999)} className="item">
          All
        </button>
      </div>
    );
  }
}

export default DateChange;
