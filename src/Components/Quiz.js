import React, { Component } from 'react';
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'



class Quiz extends Component {
state= {
  clicked: false
}

clicked = (event) => {
  if(event.target.classList.contains("choice")){
    let pick = event.target.innerText
    let choosen = document.getElementById(`${pick}`)
    if(this.state.clicked){
      // debugger
      choosen.style.backgroundColor = "#111845a6"
      this.setState({
        clicked: false
      })
    }
    else{
  // let pick = event.target.innerText
  choosen.style.backgroundColor = "rgba(30, 130, 76, 1)"
  // debugger
  this.setState({
    clicked: true
  })
}
}
}
render(){
  // debugger
  return (
    <div className="wrap" >
    <div className ="color" onClick={(e)=>{this.props.checked(e)}}/>
      <div className="choice" id={`${this.props.choice}`} onClick={this.clicked} >
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
        <p className="checked">
          {this.props.choice}
        </p>
      </div>
      </div>
  )
}
}

export default Quiz

    // background: rgba(30, 130, 76, 1);
