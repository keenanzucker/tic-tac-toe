import React, { Component } from 'react';
import '../stylesheets/Announcement.css';


class Announcement extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
      	<h2> Game Over = {this.props.winner} </h2>
      </div>
    );
  }
}

export default Announcement;
