import React, { Component } from 'react';
import './App.css';
//import openSocket from 'socket.io-client';
import socketIOClient from "socket.io-client";
//const  socket = openSocket('https://qrinfot.herokuapp.com/');
const socket = socketIOClient('https://qrinfot.herokuapp.com/');
class App extends Component {
    subscribeToTimer(cb) {

        console.log('check 1', socket.connected);
        socket.on('messaged', function(messaged) {
          alert('Le serveur a un message pour vous : ' + messaged);
        });
  

        socket.on('connect', function() {
            console.log('check 2', socket.connected);
           // socket.emit('message', 'Salut serveur, ça va ?');
           // socket.on('timer', timestamp => cb(null, timestamp));
           // socket.emit('date', 1000);
        });

 
}

clickEmit() {
  const socket = socketIOClient('https://qrinfot.herokuapp.com/');
  socket.emit('message', 'Salut serveur, ça va ?');
  socket.on('connect', function() {
    console.log('check 2', socket.connected);
   // socket.emit('message', 'Salut serveur, ça va ?');
   // socket.on('timer', timestamp => cb(null, timestamp));
   // socket.emit('date', 1000);
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
           <p><input type="button" onClick = {this.clickEmit()} value="Embêter le serveur" id="poke" /></p>
          
      </div>
    );
  }
}

export default App;
