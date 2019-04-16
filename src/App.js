import React, { Component } from 'react';
import './App.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
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

        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          onChange={this.handleChangeStart}
        />

        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          onChange={this.handleChangeEnd}
        />
      </div>
    );
  }
}

export default App;
