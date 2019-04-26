import React, { Component } from 'react';
import "../CSS/Screen.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'



class Popup  extends Component {
render(){
  // console.log(this.props.lost);
  return(
<div>
{this.props.lost ?
  <div>
  <img className= "exed" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" onClick={this.props.clicked}/>

  <div className="popup">

<p className = "lost"> You Lost, But you stil have {this.props.turn} lives left. You can either replay the game with the same bot and hopefully get more info or try to guess again.</p>

<div className="choice"  id="retry" >
  <span className="top"></span>
  <span className="bottom"></span>
  <p className = "goBack" onClick={this.props.retry}> Retry with the same bot</p>

</div>
<div className="choice"  id="redo" >
  <span className="top"></span>
  <span className="bottom"></span>
  <p className= "guess" onClick={this.props.redo}> Guess Again</p>

</div>

</div>
</div> :
  <div>
    <img className= "exed" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" onClick={this.props.clicked}/>
              <div className="popup">
              <span ></span>
              <span className="right"></span>
              <span></span>
              <span className="left"></span>
              { this.props.robot !== null && this.props.robot !== undefined ?
                <div>
              <p className = "robotName"> {this.props.robot.name} </p>
                   <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span> <img className="headpic" src={require(`../Images/head/robot-${this.props.robot.robothead}.png`)}/> </div>
                <div className="popup-container">
                <p> Attributes </p>
                  <p className="popup-single"> Hear: {this.props.robot.hear? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p>
                  <p className="popup-single"> Go Upstairs:  {this.props.robot.stairs? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p>
                  <p className="popup-single">Open Doors: {this.props.robot.doors? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p>
                  <p className="popup-single"> Talk: {this.props.robot.talk? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p>
                  <p className="popup-single"> Have arms: {this.props.robot.arms? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p>
                  <p className="popup-single"> Speed: {this.props.robot.speed? <img className= "check" src="https://www.scanningwizard.com/assets/images/check-mark@2x.png" /> :<img className= "ex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" /> }</p></div>
                  <div className ="color2" onClick = {()=>{this.props.selected(this.props.robot)}}/>

                  <div className="choice"  id="choosen" >
                    <span className="top"></span>
                    <span className="right"></span>
                    <span className="bottom"></span>
                    <span className="left"></span>
                    <p className="undo" > This Is my bot </p>
                  </div>
                  </div>
: null }
</div>
</div>
}

                </div>

  )
}
}

export default Popup
