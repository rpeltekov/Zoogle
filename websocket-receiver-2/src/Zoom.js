import React, { Component } from 'react'
import { ZoomMtg } from "@zoomus/websdk";
const API_KEY = 'n1TaQgWDRfKlseHZEakN8w';
const API_SECRET = 'DLnpEoxBB1dAJVXrbEJaWKjoCSEjwTYiJoSr';
export default class Zoom extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name: this.props.name,
            url: this.props.url
        }
    }
    state = {
        meetingLaunched: false,
    }
    launchMeeting = (url, name) => {
        console.log(url, name, 'launch meeting');
        if (url != '' && name != '') {
            console.log(url, name, 'passed empty if statement');
            const meetConfig = {
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                meetingNumber: parseInt(url, 10),
                userName: name,
                userEmail: 'rpeltekov@gmail.com',
                passWord: '',
                leaveUrl: 'https://zoom.us',
                role: 0
            };
            ZoomMtg.generateSignature({
                meetingNumber: meetConfig.meetingNumber,
                apiKey: meetConfig.apiKey,
                apiSecret: meetConfig.apiSecret,
                role: meetConfig.role,
                success(res) {
                    ZoomMtg.init({
                        leaveUrl: 'http://www.zoom.us',
                        success() {
                            ZoomMtg.join(
                                {
                                    meetingNumber: meetConfig.meetingNumber,
                                    userName: meetConfig.userName,
                                    signature: res.result,
                                    apiKey: meetConfig.apiKey,
                                    userEmail: 'email@gmail.com',
                                    passWord: meetConfig.passWord,
                                    success() {
                                        setTimeout(function () {
                                            var startButton = document.getElementById('pc-join');
                                            startButton.click();
                                        }, 3000);
                                    },
                                    error(res) {
                                        console.log(res, "1");
                                    }
                                }
                            );
                        },
                        error(res) {
                            console.log(res, "2");
                        }
                    });
                }
            });
        }
    }
    componentDidMount() {

    }
    shouldComponentUpdate(nextProps) {
        return nextProps.name != this.props.name
            && nextProps.url != this.props.url;
    }
    render() {
        const { meetingLaunched } = this.state;
        if (this.props.url != '' && this.props.name != '') {
            this.launchMeeting(this.props.url, this.props.name);
        }
        // Displays a button to launch the meeting when the meetingLaunched state is false
        return (
            <>
                {!meetingLaunched ?
                    <button className="launchButton" onClick={() => this.launchMeeting(this.props.url, this.props.name)}>Launch Meeting</button>
                    :
                    <></>
                }
            </>
        )
    }
}