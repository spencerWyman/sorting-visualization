import React from 'react';
import Box from './Box.jsx';

class Wrapper extends React.Component {
  render() {

    let boxes = [];
    for (let i = 0; i < this.props.values.length; i++) {
      boxes.push(<Box value={this.props.values[i]} key={i}/>)
    }

    return (
      <div className = 'wrapper'>
        {boxes}
      </div>
    )
  }
}

export default Wrapper;
