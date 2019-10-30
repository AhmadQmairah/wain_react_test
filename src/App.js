import React from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  //Initialize the connection to the server
  state = {
    tags: [],
    selectedTags: []
  };

  socket1 = socketIOClient("192.168.100.232");
  join() {
    this.socket1.emit("join", {
      id: "2",
      name: "Ahmad"
    });
  }

  submitAnswer() {
    this.socket1.emit("quiz_submit", {
      tags: this.state.selectedTags,

      budget: parseInt(this.refs.budget.value)
    });
  }
  addTag() {
    this.state.selectedTags.push(parseInt(this.refs.tags.value));
  }

  render() {
    let tags;

    this.socket1.on("quiz", data => {
      !this.state.tags.length && this.setState({ tags: data.tags });
    });
    this.socket1.on("filtered_rest", data => {
      this.setState({
        filteredRestaurants: data.filteredRestaurants.map(rest => (
          <li>{rest.name}</li>
        ))
      });
    });
    console.log(this.state.tags);
    if (this.state.tags.length)
      tags = this.state.tags.map(cat => (
        <option value={cat.id}>{cat.name}</option>
      ));

    return (
      <div className="App">
        <button onClick={() => this.join()}>Join room</button>

        <select ref="tags">{tags}</select>

        <select ref="like">
          <option value={1}>like</option> <option value={0}>dont care</option>{" "}
          <option value={-1}>hate</option>
        </select>
        <select ref="budget">
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
        </select>
        <button onClick={() => this.addTag()}>Add tag</button>
        <button onClick={() => this.submitAnswer()}>Submit Answer</button>

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
