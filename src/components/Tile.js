import React, { Component } from 'react';
import '../stylesheets/Tile.css';


class Tile extends Component {

  tileClick(props) {
    props.updateBoard(props.loc);
  }

  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
        <p className={"animated infinite pulse " + this.props.value}> {this.props.value} </p>
      </div>
    );
  }
}


export default Tile;
