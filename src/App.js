import React, { Component } from 'react';
import './App.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


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
        <InfiniteCalendar display="years" selected={null}/>
      </div>
    );
  }
}

export default App;
