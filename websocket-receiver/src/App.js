import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import Info from "./Info";
//import Zoom from "./Zoom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentInit: [],
      settings: [],
      isMuted: false
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
    });
  }

  render() {
    return <Info />;
  }
}
export default App;
