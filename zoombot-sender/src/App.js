import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentURL: "",
      username: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSettingMute = this.handleSettingMute.bind(this);
    this.handleSettingUnmute = this.handleSettingUnmute.bind(this);
    this.handleSettingLeave = this.handleSettingLeave.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      url: this.state.currentURL,
      user: this.state.username
    };
    itemsRef.push(item);
    this.setState({
      currentURL: "",
      username: ""
    });
  }
  handleSettingMute(e) {
    e.preventDefault();
    const settingsRef = firebase.database().ref("settings");
    const commands = {
      command: "mute"
    };
    settingsRef.push(commands);
  }
  handleSettingUnmute(e) {
    e.preventDefault();
    const settingsRef = firebase.database().ref("settings");
    const commands = {
      command: "unmute"
    };
    settingsRef.push(commands);
  }

  handleSettingLeave(e) {
    e.preventDefault();
    const settingsRef = firebase.database().ref("settings");
    const commands = {
      command: "leave"
    };
    settingsRef.push(commands);
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Zoogle Assistant Web Portal</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Bot Name"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <input
                type="text"
                name="currentURL"
                placeholder="Zoom Meeting Number"
                onChange={this.handleChange}
                value={this.state.currentURL}
              />
              <button>Start Zoogle Assistant</button>
            </form>
          </section>
          <section className="add-item">
            <h2>Send Commands to the Bot</h2>
            <ul>
              <li>
                <button onClick={this.handleSettingMute}>Mute</button>
              </li>
              <li>
                <button onClick={this.handleSettingUnmute}>Unmute</button>
              </li>
              <li>
                <button onClick={this.handleSettingLeave}>Leave Meeting</button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
