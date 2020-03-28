import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSetup: []
    };
  }

  componentDidMount() {
    const usernameRef = firebase.database().ref("items");
    usernameRef.on("value", snapshot => {
      let items = snapshot.val();
      let tempState = [];
      for (let word in items) {
        tempState.push({
          url: items[word].url,
          user: items[word].user
        });
      }
      console.log("componentDidMount");
      console.log(tempState);
      this.setState({
        currentSetup: tempState
      });
      console.log("this.currentSetup");
      console.log(this.currentSetup);
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Firebase Receiever</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            {console.log("testing")}
            {console.log(this.state.currentSetup)}
            <div>
              <h1>Most Recent Setup Last</h1>
              {this.state.currentSetup.map(elem => {
                return (
                  <div>
                    <h3>user {elem.user} initiated: </h3>
                    <h4>{elem.url}</h4>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
