import React, { Component } from 'react';
import "../CSS/Screen.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'
import Type from "./Type"
import Typist from 'react-typist';
import Robot from './Robot'




class Screen extends Component {
state = {
  string:[],
  change: false
}

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.prompt !== prevProps.prompt) {
    // debugger
const desc = document.querySelector(".description")

desc.innerHTML =` <p className="font">
      ${this.props.prompt}
    </p>`
  }
  if(this.props.retry !== prevProps.retry){
    this.setState({
      change: false
    })
  }
}

screenChange = () => {
  this.setState({
    change: true
  })
}

check = (event) => {
if(event.target.innerText == "Captured"){
  this.setState({
    change: true
  })
}

}

reload = () => {

}

  render() {
// console.log("rerende");
    // console.log(this.state.string);

//     if(this.props.retry){
// this.reload()
//     }
    // debugger
    const question= this.props.prompt
    return (
      <div className="tv screenContainer">
      {this.state.change ? <div><p className="turn">Turn:{this.props.turn} </p> <Robot robot={this.props.robot} robots={this.props.robots} checked={this.props.checked} clicked={this.props.clicked} unclicked={this.props.unclicked}/> </div> :

  <div className="outerBox">
  <div className="description"><p className="font">
        {this.props.prompt}
      </p></div>
  {this.props.choiceA !== null?<div className="choiceA"><button  onClick={(event)=>{
    this.props.changePath(this.props, this.props.choiceA);
    this.check(event)
  }}><p>{this.props.choiceA}</p></button></div> : <div className="choiceC"><button onClick={this.screenChange}><p>{this.props.choiceC}</p></button></div>}
  {this.props.choiceB !== null?<div className="choiceB"><button onClick={()=>{this.props.changePath(this.props, this.props.choiceB)}}><p>{this.props.choiceB}</p></button></div> : null}
  <div className="scanlines" />
  <div className="glow" />

</div>}
      </div>
    );
  }
}

export default Screen;

// <GlitchEffect duration= "5s">

// </GlitchEffect>
