import React from 'react';

class Box extends React.Component {
  render() {
    return (
      <div data-index={this.props.index} className={this.props.classProps} onClick={this.props.selectBox}>{this.props.value}</div>
    )
  }
}

export default Box;
