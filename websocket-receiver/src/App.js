import React, { Component } from "react";
import "./App.css";
import Zoom from "./Zoom.js";
import Setting from "./setting.js";
import firebase from "./firebase";
import { ZoomMtg } from "@zoomus/websdk";

const API_KEY = "n1TaQgWDRfKlseHZEakN8w";
const API_SECRET = "DLnpEoxBB1dAJVXrbEJaWKjoCSEjwTYiJoSr";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      joined: false,
      first: true
    };
  }

  componentDidMount() {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    this.receiveInit();
    this.receiveSettings();
  }

  receiveSettings() {
    const usernameRef = firebase.database().ref("settings");
    usernameRef.on("value", snapshot => {
      let commands = snapshot.val();
      let tempState = [];
      for (let word in commands) {
        if (commands[word].command === "mute") {
          ZoomMtg.mute({
            mute: true
          });
          console.log("isMute: " + this.state.isMuted);
        } else if (commands[word].command === "unmute") {
          ZoomMtg.mute({
            mute: false
          });
          console.log("isMute: " + this.state.isMuted);
        }
        tempState.push({ command: commands[word].command });
      }
      this.setState({
        settings: tempState
      });
      var len = this.state.settings.length - 1;
      var shouldLeave = this.state.settings[len].command;
      console.log("shouldLeave: " + shouldLeave);
      if (shouldLeave === "leave") {
        ZoomMtg.leaveMeeting({});
      }
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

      let len = tempState.length - 1;
      console.log(this.state.currentInit);

      if (len >= 0 && !this.state.first) {
        let turl = tempState[len].url;
        let user = tempState[len].user;
        console.log(len, turl, user);
        if (!this.state.joined) {
          this.launchMeeting(turl, user);
          this.setState({
            joined: true
          });
        } else {
          console.log("join new meeting");
          //somehow exit and launch new
        }
      }
      this.setState({
        first: false
      });
    });
  }

  launchMeeting = (url, name) => {
    console.log(url, name, "launch meeting");
    if (url != "" && name != "") {
      console.log(url, name, "passed empty if statement");
      const meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: parseInt(url, 10),
        userName: name,
        userEmail: "rpeltekov@gmail.com",
        passWord: "",
        leaveUrl: "localhost:3000",
        role: 0
      };
      ZoomMtg.generateSignature({
        meetingNumber: meetConfig.meetingNumber,
        apiKey: meetConfig.apiKey,
        apiSecret: meetConfig.apiSecret,
        role: meetConfig.role,
        success(res) {
          ZoomMtg.init({
            leaveUrl: meetConfig.leaveUrl,
            success() {
              ZoomMtg.join({
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                signature: res.result,
                apiKey: meetConfig.apiKey,
                userEmail: "email@gmail.com",
                passWord: meetConfig.passWord,
                success() {
                  console.log("joined");
                  setTimeout(function() {
                    console.log("joining audio");
                    var startButton = document.getElementById("pc-join");
                    console.log(startButton);
                    if (startButton) {
                      startButton.click();
                    }
                  }, 6000);
                },
                error(res) {
                  console.log(res, "1");
                }
              });
            },
            error(res) {
              console.log(res, "2");
            }
          });
        }
      });
    }
  };

  joinAudio = () => {
    console.log("joining audio");
    var startButton = document.getElementById("pc-join");
    console.log(startButton);
    if (startButton) {
      startButton.click();
      clearInterval(this.state.timerId);
    }
  };

  render() {
    console.log("bleh2");
    return <div className="component-app"></div>;
  }
}
