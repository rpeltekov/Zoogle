import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

export default class Info extends Component {
  constructor() {
    super();
    this.state = {
      currentInit: [],
      settings: [],
      isMuted: false,
      currentSetting: "",
      currentUser: "",
      currentURL: ""
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
        if (commands[word].command == "mute") {
          this.setState({ isMuted: true });
        } else if (commands[word].command == "unmute") {
          this.setState({ isMuted: false });
        }
        tempState.push({ command: commands[word].command });
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
      var len = this.state.currentInit.length - 1;
      var url = this.state.currentInit[len].url;
      var user = this.state.currentInit[len].user;
      this.setState({
        currentURL: url,
        currentUser: user
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
            <div>
              <h1>Most Recent Setup Last</h1>
              <h3>
                User {this.state.currentUser} connected to:{" "}
                {this.state.currentURL}
              </h3>
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
                    <h5>Mute setting: </h5>
                    <h5>{this.state.isMuted ? "muted" : "unmuted"}</h5>
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
