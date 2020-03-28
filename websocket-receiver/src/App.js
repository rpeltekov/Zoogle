import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentInit: [],
      settings: []
    };
  }

  componentDidMount() {
    this.receiveInit();
    this.receiveSettings();
  }

  receiveSettings() {
    const usernameRef = firebase.database().ref("settings");
    usernameRef.on("value", snapshot => {
      let commands = snapshot.val();
      let tempState = [];
      for (let word in commands) {
        tempState.push({
          command: commands[word].command
        });
      }
      this.setState({
        settings: tempState
      });
    });
  }

  receiveInit() {
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
      this.setState({
        currentInit: tempState
      });
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
            {console.log("currentInit")}
            {console.log(this.state.currentInit)}
            <div>
              <h1>Most Recent Setup Last</h1>
              {this.state.currentInit.map(elem => {
                return (
                  <div>
                    <h3>user {elem.user} initiated: </h3>
                    <h4>{elem.url}</h4>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="add-item">
            {console.log("settings")}
            {console.log(this.state.settings)}
            <div>
              <h1>Most recent setting last</h1>
              {this.state.settings.map(elem => {
                return (
                  <div>
                    <h3>execute: {elem.command}</h3>
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
