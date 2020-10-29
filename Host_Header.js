import React from "react";
import "./Primary.css";

class HostSelector extends React.Component {
  render() {
    return (
      <div>
        {/* Host Selector */}
        <div className="Header">
          <select className="Host">
            <p>a graphing solution</p>
            <option>Host</option>

            <option href="#">logic-test-01</option>
            <option href="#">logic-test-02</option>
          </select>

          {/* The Header */}

          <h1>graphster </h1>
        </div>
      </div>
    );
  }
}

export default HostSelector;
