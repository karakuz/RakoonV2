  import React from "react";

  class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { priceRange: { min: 0, max: 0 } };
    }
    handlePriceMinMax = (value, event) => {
      const priceRange = this.state.priceRange;
      priceRange[value] = event.target.value;
      this.setState({ priceRange });
    };
    render() {
      return <Child onChange={this.handlePriceMinMax}/>;
    }
  }

  class Child extends React.Component {
    render() {
      return (
        <div className="form-group">
          <label>Price</label>
          <input id="min" type="number" onChange={this.minChange} />
          <input id="max" type="number" onChange={this.maxChange} />
        </div>
      );
    }

    minChange = e => {
      this.props.onChange("min", e);
    };

    maxChange = e => {
      this.props.onChange("max", e);
    };
  }


  export default Parent;
