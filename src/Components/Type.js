import React, { Component } from 'react';
import "../CSS/Screen.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'



class Type extends Component {
render(){
  console.log(this.props.question);
  return(
    <div>
    <p>{this.props.question}</p>
    </div>
  )
}
}

export default Type


// <p>        <Typed
// strings={[`${this.props.question}`]}
// typeSpeed={40}
// /></p>
