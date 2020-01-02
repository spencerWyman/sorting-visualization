import React from 'react';

class UI extends React.Component {
  render() {

    return(
      <div className='userInterface'>
        <input id='inputField' type='text'></input>
        <button onClick={this.props.addValue}>Add</button>
        <button onClick={this.props.sortStep}>Next Step</button>
        <button onClick={this.props.clearValues}>Clear Boxes</button>
        <button onClick={this.props.swapSelected}>Swap Selected</button>
      </div>
    )
  }
}

export default UI;
