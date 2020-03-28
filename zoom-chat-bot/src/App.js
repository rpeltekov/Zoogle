import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currLink: '',
      botName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const botsRef = firebase.database().ref('bots');
    const bot = {
      link: this.state.currLink,
      name: this.state.botName
    }
    botsRef.push(bot);
    this.setState({
      currLink: '',
      botName: ''
    });
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Zoom Google Assistant</h1>
              
            </div>
        </header>
        <div className='container'>
        <section className="add-bot">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="botName" placeholder="What's your bot's name?" onChange={this.handleChange} value={this.state.botName} />
            <input type="text" name="currLink" placeholder="Zoom meeting URL" onChange={this.handleChange} value={this.state.currLink} />
            <button>Add Bot</button>
          </form>
        </section>
          <section className='display-bot'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;