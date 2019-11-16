import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
const  socket = openSocket('https://qrinfot.herokuapp.com/');

class App extends Component {
    subscribeToTimer(cb) {

        console.log('check 1', socket.connected);
        socket.on('message', function(message) {
          alert('Le serveur a un message pour vous : ' + message);
        });

        socket.on('connect', function() {
            console.log('check 2', socket.connected);
            socket.on('timer', timestamp => cb(null, timestamp));
            socket.emit('date', 1000);
        });

 
}
    constructor(props) {
        super(props);
        this.subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
    }

    state = {
        timestamp: 'no timestamp yet'
    };
  render() {
      return (
      <div className="App">
          <p className="App-intro">
              This is the timer value: {this.state.timestamp}
          </p>
      </div>
    );
  }
}

export default App;
