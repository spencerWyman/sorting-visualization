import React from 'react';

class AlgoChoice extends React.Component {
  render() {
    const buttonClass = {
      bubbleSort: '',
      insertionSort: ''
    }
    buttonClass[this.props.algoSelect] = 'selected';
    for (let mastered of this.props.mastery) {
      buttonClass[mastered] += ' mastered';
    }

    return (
      <div className = 'algo-container'>
        <button className={buttonClass.bubbleSort} id='bubbleSort' onClick={this.props.switchAlgo}>Bubble Sort</button>
        <button className={buttonClass.insertionSort} id='insertionSort' onClick={this.props.switchAlgo}>Insertion Sort</button>
      </div>
    )
  }
}

export default AlgoChoice;
