import React, {Component} from "react";
import "./setting.css";

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInit: [],
            settings: [],
            isMuted: false
        };
    }

    render() {
        return (
            <div className="setting">
                <header>
                    <div className="wrapper">
                        <h1>Firebase Receiever</h1>
                    </div>
                </header>
                <div className="container">
                    <section className="add-item">
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
                                        {console.log("in render isMusted: " + this.state.isMuted)}
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

export default Setting;
