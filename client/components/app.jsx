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
      values: [2, 1, 0],
      swapQueue: [],
      selected: [-1, -1],
      algoSelect: 'bubbleSort',
      incorrect: [-1, -1],
      mastery: [],
      sorted: false,
    };
    this.addValue = this.addValue.bind(this);
    this.bubbleSortQueue = this.bubbleSortQueue.bind(this);
    this.sortStep = this.sortStep.bind(this);
    this.switchAlgo = this.switchAlgo.bind(this);
    this.clearValues = this.clearValues.bind(this);
    this.selectBox = this.selectBox.bind(this);
    this.swapSelected = this.swapSelected.bind(this);
    this.checkSort = this.checkSort.bind(this);
  }

  componentDidMount() {
    const mastery = document.cookie.slice(8).split('*');
    this.setState({ mastery })
  }

  addValue() {
    const inputField = document.getElementById('inputField');
    const values = [...this.state.values];
    const interpreted = Number(inputField.value);
    if ((interpreted || interpreted === 0) && (inputField.value.length <= MAX_DIGITS)) { values.push(interpreted); }
    inputField.value = '';
    this.setState({
      values: values,
      sorted: false,
    })
  }

  clearValues() {
    this.setState({
      values: [],
      selected: [-1, -1],
      sorted: false,
     });
  }

  randomValues(min, max, num) {
    let values = [];
    for (let i = 0; i < num; i++) {
      values.push(Math.floor(Math.random() * (max - min) + min));
    }

    this.setState({
      values,
      selected: [-1, -1],
      sorted: false,
     });
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
    this.setState({
      selected,
      incorrect: [-1, -1],
     });
  }

  swapSelected() {
    const values = [...this.state.values];
    let swapQueue = this.fillQueue(this.state.algoSelect)
    const nextSwap = swapQueue.length > 0 ? new Set(swapQueue[0]) : new Set();
    const selected = [...this.state.selected];
    let incorrect = [-1, -1];
    if (selected[0] !== -1 && selected[1] !== -1) {
      if (nextSwap.has(selected[0]) && nextSwap.has(selected[1])) {
        [values[selected[0]], values[selected[1]]] = [values[selected[1]], values[selected[0]]];
        swapQueue.shift();
      } else {
        incorrect = [...selected];
      }
    };
    this.setState({
      values,
      incorrect,
      swapQueue,
      selected: [-1, -1],
    });
  }

  checkSort() {
    const values = [...this.state.values];
    let sorted = values.reduce((acc, el, index) => {
      if (index === 0) {
        return true
      } else {
        return acc && (el >= values[index - 1])
      }
    }, true);
    this.setState({ sorted });
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
          <AlgoChoice algoSelect={this.state.algoSelect} switchAlgo={this.switchAlgo} mastery={this.state.mastery}/>
          <div className ='test-container'>
            <button onClick={() => this.randomValues(0, 10, 6)}>RANDOM</button>
            <button onClick={this.checkSort}>Check Sort</button>
          </div>
          <UI addValue={this.addValue} bubbleSortQueue={this.bubbleSortQueue} sortStep={this.sortStep} clearValues = {this.clearValues} swapSelected={this.swapSelected}/>
        </div>
        <Wrapper sorted={this.state.sorted} values={this.state.values} selected={this.state.selected} selectBox={this.selectBox} incorrect={this.state.incorrect}/>
      </div>
    )
  }
}

export default App;
