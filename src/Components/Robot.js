import React, { Component } from 'react';
import "../CSS/Robot.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'
import Type from "./Type"
import Typist from 'react-typist';
import {robot} from '../Images/robot.png'
import Head from "./Head"
import Instruction from "./Instruction"
import $ from "jquery"
import Quiz from "./Quiz"




class Screen extends Component {
state = {
  string:[],
  robots: [],
  instructions: true,
  length: this.props.robots.length
}
componentDidMount(){

  let unshuffled = this.props.robots

  let shuffled = unshuffled
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

// debugger
  this.setState({
    robots: shuffled
  })
}

componentDidUpdate(prevProps) {

  // Typical usage (don't forget to compare props):
  // debugger
  if (this.props.robots !== prevProps.robots) {
    let unshuffled = this.props.robots

    let shuffled = unshuffled
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    this.setState({
      robots: shuffled,
      length: shuffled.length
    })
  }

  if (this.props.prompt !== prevProps.prompt) {
const desc = document.querySelector(".description")

desc.innerHTML =` <p className="font">
      ${this.props.prompt}
    </p>`
  }
}
clicked = () => {
  const div = document.querySelector(".robot-div")
  div.classList.toggle("show")

  this.setState({
    instructions: false
  })
}



  render() {
// console.log(this.state.robots);
// console.log(this.props.checked);
    // console.log(this.state.string);
    if(this.props){
      if(this.props.robots !== null){
    var robotarray = this.state.robots.map(robot => <Head robot={robot} clicked={this.props.clicked}/>)

    }
  }




const options = [{choice: "hear", index: 1}, {choice: "see", index: 2}, {choice: "arms", index: 3}, {choice: "speed", index: 4}, {choice: "wheels", index: 5}, {choice: "jump", index: 6}, {choice: "doors", index: 7}, {choice: "stairs", index: 8}, {choice: "talk", index: 9}, {choice: "laser", index: 10}, {choice: "heat", index: 11}, {choice: "gas", index: 12}]

const choices = options.map(option => <Quiz choice = {option.choice} index={option.index} checked={this.props.checked} />)






    const question= this.props.prompt

    return (

      <div  className="tv screenContainer">
        {this.state.instructions?
          <div className="pop"><Instruction clicked={this.clicked}/> </div> : null}
        {this.props.robot?
          <div className="robot-div">
          <p> {this.state.length} </p>

            <p className="question">
              Can I...
            </p>
            <div className="choices">
              {choices}
              <div className="choice"  id="undo" onClick={this.props.unclicked}>
                <span className="top"></span>
                <span className="right"></span>
                <span className="bottom"></span>
                <span className="left"></span>
                <p className="undo"> UNDO </p>
              </div>
            </div>
            <div className="robotlist">
            <div className = "bots">
              {robotarray}
            </div>
            </div>
        </div> :
      null
    }
      </div>
    );
  }
}

export default Screen;


// <img className="robot-pic" src={require(`../Images/head/robot-${this.props.robot.robothead}.png`)}/>



// {this.props.robot.hear? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/07/01095523/Letter-X-PNG-Background-Image-228x171.png" /> }
//
// <p> 2. </p>
// <img className="robot-pic" src="https://cdn-images-1.medium.com/max/1200/1*C_iQ8mbPZidBmiV278fPug.png"/>
// <p> 3. </p>
// <img className="robot-pic" src="https://cdn-images-1.medium.com/max/1200/1*C_iQ8mbPZidBmiV278fPug.png"/>
// <p> 4. </p>
// <img className="robot-pic" src="https://cdn-images-1.medium.com/max/1200/1*C_iQ8mbPZidBmiV278fPug.png"/>
// <p> 5. </p>
// <img className="robot-pic" src="https://cdn-images-1.medium.com/max/1200/1*C_iQ8mbPZidBmiV278fPug.png"/>
