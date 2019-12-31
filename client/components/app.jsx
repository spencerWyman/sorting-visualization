import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './sortingWrapper.jsx';
import UI from './userInterface.jsx';
import AlgoChoice from './algoChoice.jsx';

const MAX_DIGITS = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      swapQueue: [],
      algoSelect: 'bubbleSort',
    };
    this.addValue = this.addValue.bind(this);
    this.bubbleSortQueue = this.bubbleSortQueue.bind(this);
    this.sortStep = this.sortStep.bind(this);
    this.switchAlgo = this.switchAlgo.bind(this);
  }

  addValue() {
    const inputField = document.getElementById('inputField');
    const values = [...this.state.values];
    const interpreted = Number(inputField.value);
    if ((interpreted || interpreted === 0) && (inputField.value.length <= MAX_DIGITS)) { values.push(interpreted); }
    inputField.value = '';
    this.setState({
      values: values
    })
  }

  bubbleSortQueue() {
    let swapHappened = true;
    let swapQueue = [];
    let values = [...this.state.values];
    while (swapHappened) {
      swapHappened = false;
      for (let i = 0; i < values.length; i++) {
        if (values[i] > values[i+1]) {
          swapQueue.push([i, i+1]);
          [values[i], values[i+1]] = [values[i+1], values[i]];
          swapHappened = true;
        }
      }
      console.log(swapQueue);
    }
    return swapQueue;
  }

  insertionSortQueue() {
    console.log('INSERTIONSORT');
    return [];
  }

  sortStep() {
    let swapQueue = [...this.state.swapQueue];
    if (swapQueue.length === 0) {
      swapQueue = this.fillQueue(this.state.algoSelect);
    }
    if (swapQueue.length > 0) {
      const values = [...this.state.values];
      const swap = swapQueue.shift();
      [values[swap[0]], values[swap[1]]] = [values[swap[1]], values[swap[0]]];
      this.setState({
        values: values,
        swapQueue: swapQueue,
      })
    }
  }

  switchAlgo(e) {
    this.setState({
      algoSelect: e.target.id
    })
  }

  fillQueue(algo) {
    let swapQueue = [];
    switch (algo) {
      case 'bubbleSort':
        swapQueue = this.bubbleSortQueue()
        break;
      case 'insertionSort':
        swapQueue = this.insertionSortQueue()
        break;
    }
    return swapQueue;
  }


  render() {
    return(
      <div className = 'app'>
        <AlgoChoice algoSelect={this.state.algoSelect} switchAlgo={this.switchAlgo}/>
        <UI addValue={this.addValue} bubbleSortQueue={this.bubbleSortQueue} sortStep={this.sortStep}/>
        <Wrapper values={this.state.values} />
      </div>
    )
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('app-container'));
