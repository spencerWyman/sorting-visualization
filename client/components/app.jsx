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
      values: [0, 1, 2],
      swapQueue: [],
      selected: [-1, -1],
      algoSelect: 'bubbleSort',
    };
    this.addValue = this.addValue.bind(this);
    this.bubbleSortQueue = this.bubbleSortQueue.bind(this);
    this.sortStep = this.sortStep.bind(this);
    this.switchAlgo = this.switchAlgo.bind(this);
    this.clearValues = this.clearValues.bind(this);
    this.selectBox = this.selectBox.bind(this);
    this.swapSelected = this.swapSelected.bind(this);
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

  clearValues() {
    this.setState({ values: [] });
  }

  randomValues(min, max, num) {
    let values = [];
    for (let i = 0; i < num; i++) {
      values.push(Math.floor(Math.random() * (max - min) + min));
    }
    this.setState({ values });
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
    const swapQueue = [];
    const values = [...this.state.values];
    for (let i = 1; i < values.length; i++) {
      for (let j = i; j >= 0; j--) {
        if (values[j] < values[j-1]) {
          swapQueue.push([j, j-1]);
          [values[j-1], values[j]] = [values[j], values[j-1]];
        } else {
          break;
        }
      }
    }
    return swapQueue;
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

  selectBox(e) {
    const selected = [...this.state.selected]
    const index = Number(e.target.dataset.index);
    if (selected[0] === index) {
      selected[0] = -1;
    } else if (selected[1] === index) {
      selected[1] = -1;
    } else if (selected[0] === -1) {
      selected[0] = index;
    } else if (selected[1] === -1) {
      selected[1] = index;
    }
    this.setState({ selected });
  }

  swapSelected() {
    const values = [...this.state.values];
    const selected = [...this.state.selected];
    console.log('selected', selected);
    if (selected[0] !== -1 && selected[1] !== -1) {
      [values[selected[0]], values[selected[1]]] = [values[selected[1]], values[selected[0]]];
    };
    this.setState({ values });
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
        <div className = 'UI-container'>
          <AlgoChoice algoSelect={this.state.algoSelect} switchAlgo={this.switchAlgo}/>
          <button onClick={() => this.randomValues(0, 10, 5)}>RANDOM</button>
          <UI addValue={this.addValue} bubbleSortQueue={this.bubbleSortQueue} sortStep={this.sortStep} clearValues = {this.clearValues} swapSelected={this.swapSelected}/>
        </div>
        <Wrapper values={this.state.values} selected={this.state.selected} selectBox={this.selectBox}/>
      </div>
    )
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('app-container'));
