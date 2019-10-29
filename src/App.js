import React from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  //Initialize the connection to the server
  state = null;
  socket1 = socketIOClient("192.168.100.232");
  join() {
    this.socket1.emit("join", {
      id: "2",
      name: "Naser"
    });
  }
  sendShit() {
    this.socket1.emit("hi", {
      id: "2"
    });
  }
  submitAnswer() {
    console.log(this.refs.cats.value, this.refs.flavs.value);
    this.socket1.emit("quiz_submit", {
      category: parseInt(this.refs.cats.value),
      flavour: parseInt(this.refs.flavs.value),
      budget: 4
    });
  }
  render() {
    let categories;
    let flavours;
    let filteredRestaurants;
    this.socket1.on("quiz", data => {
      !this.state && this.setState(data);
    });
    this.socket1.on("filtered_rest", data => {
      this.setState({
        filteredRestaurants: data.filteredRestaurants.map(rest => (
          <li>{rest.name}</li>
        ))
      });
    });
    if (this.state) {
      categories = this.state.categories.map(cat => (
        <option value={cat.id}>{cat.name}</option>
      ));
      flavours = this.state.flavours.map(cat => (
        <option value={cat.id}>{cat.name}</option>
      ));
    }
    return (
      <div className="App">
        <button onClick={() => this.join()}>Join room</button>
        <button onClick={() => this.sendShit()}>Send shit</button>
        <select ref="cats">{categories}</select>
        <select ref="flavs">{flavours}</select>
        <button onClick={() => this.submitAnswer()}>Submit Answer</button>
        <br />
        {this.state ? (
          <>
            <h1>Suggested Restaurants: </h1>
            <ul>{this.state.filteredRestaurants}</ul>
          </>
        ) : null}
      </div>
    );
  }
}

export default App;
