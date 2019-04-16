import React, { Component } from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    msg: ''
  }
  onButtonClick() {
    ipcRenderer.send('getReport', 'send message from react');
  }

  componentDidMount() {
    ipcRenderer.on('showMessage', (event, data) => {
      this.setState({ msg: data });
    });
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.onButtonClick}>Click me</button>
        <p>Message from Server: {this.state.msg}</p>
      </div>
    );
  }
}

export default App;
