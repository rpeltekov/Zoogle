import React, {Component} from "react";
import "./App.css";
import Zoom from './Zoom.js';
import Setting from './setting.js';

export default class App extends Component {
    render() {
        return (
            <div className="component-app">
                <Zoom />
                <Setting/>
            </div>
        );
    }
}