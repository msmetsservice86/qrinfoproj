import React from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
const  socket = openSocket('https://qrinfot.herokuapp.com/');

function App() {

  subscribeToTimer(cb) {
      console.log('check 1', socket.connected);
      socket.on('connect', function() {
          console.log('check 2', socket.connected);
      });

      socket.on('timer', timestamp => cb(null, timestamp));
      socket.emit('date', 1000);
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

  return (
    <div className="App">
      <p className="App-intro">
          This is the timer value: {this.state.timestamp}
      </p>
    </div>
  );
}

export default App;
