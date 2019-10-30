import React from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  //Initialize the connection to the server
  state = null;
  Categories = [];
  Flavours = [];
  socket1 = socketIOClient("192.168.100.232");
  join() {
    this.socket1.emit("join", {
      id: "2",
      name: "Ahmad"
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
      categories: this.Categories,
      flavour: this.Flavours,
      budget: 4
    });
  }
  addCategory() {
    this.Categories.push({
      category: parseInt(this.refs.cats.value),
      like: parseInt(this.refs.like.value)
    });
  }
  addFlavour() {
    this.Flavours.push({
      flavour: parseInt(this.refs.flavs.value),
      like: parseInt(this.refs.like.value)
    });
    console.log(this.Flavours);
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
        <select ref="like">
          <option value={1}>like</option> <option value={0}>dont care</option>{" "}
          <option value={-1}>hate</option>
        </select>
        <button onClick={() => this.submitAnswer()}>Submit Answer</button>
        <button onClick={() => this.addCategory()}>Add Category</button>
        <button onClick={() => this.addFlavour()}>Add Flavour</button>
        <button onClick={() => this.socket1.emit("end")}>End</button>
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
