import React from 'react';
import Box from './Box.jsx';

class Wrapper extends React.Component {
  render() {

    let boxes = [];
    let className = '';
    for (let i = 0; i < this.props.values.length; i++) {
      if (this.props.selected[0] === i || this.props.selected[1] === i) {
        className = ' selected';
      }
      if (this.props.incorrect[0] === i || this.props.incorrect[1] === i) {
        className = ' incorrect';
      }


      boxes.push(<Box classProps={'box' + className} value={this.props.values[i]} selectBox={this.props.selectBox} index={i} key={i}/>)
      className = '';
    }

    return (
      <div className = 'wrapper'>
        {boxes}
      </div>
    )
  }
}

export default Wrapper;
