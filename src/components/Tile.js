import React, { Component } from 'react';
import '../stylesheets/Tile.css';


class Tile extends Component {

  tileClick(props) {
    props.updateBoard(props.loc, props.turn);
  }

  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
        <p> {this.props.value}</p>
      </div>
    );
  }
}


export default Tile;
