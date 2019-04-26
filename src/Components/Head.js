import React, { Component } from 'react';
import "../CSS/Screen.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'



class Head  extends Component {
render(){
  // debugger
  // console.log(this.props.question)
  const name = this.props.name;
  return(
    <React.Fragment>
  <p className="rob">{this.props.robot.name}
  <div className="pic">
    <img className="robot-pic" id={`${this.props.robot.name}`} onClick={(e) => {this.props.clicked(e)}} src={require(`../Images/head/robot-${this.props.robot.robothead}.png`)}/>
</div>
    </p>
    </React.Fragment>
  )
}
}

export default Head
