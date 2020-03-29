import React, { Component } from 'react'

import { ZoomMtg } from "@zoomus/websdk";

const API_KEY = 'n1TaQgWDRfKlseHZEakN8w';
const API_SECRET = 'DLnpEoxBB1dAJVXrbEJaWKjoCSEjwTYiJoSr';

const meetConfig = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber: 3319712923,
    userName: 'Google Assistant',
    userEmail: 'rpeletkov@gmail.com',
    passWord: '',
    leaveUrl: 'https://zoom.us',
    role: 0
};

export default class Zoom extends Component {
    state = {
        meetingLaunched: false,
    }

    launchMeeting = () => {
        ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,
            role: meetConfig.role,
            success(res) {
                console.log('signature', res.result);

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
                                    //$('#nav-tool').hide();
                                    console.log('join meeting success');
                                    setTimeout(function () {
                                        var startButton = document.getElementById('pc-join');
                                        startButton.click();
                                    }, 3000);
                                },
                                error(res) {
                                    console.log(res);
                                }
                            }
                        );

                    },
                    error(res) {
                        console.log(res);
                    }
                });

            }
        });
    }

    componentDidMount() {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }

    render() {
        const { meetingLaunched} = this.state;
        // Displays a button to launch the meeting when the meetingLaunched state is false
        return (
            <>
                {!meetingLaunched ?
                    <button className="launchButton" onClick={this.launchMeeting}>Launch Meeting</button>
                    :
                    <></>
                }
            </>
        )
    }
}