import React, { Component } from 'react';
import "../CSS/Screen.css"
import Typed from 'react-typed';
import GlitchEffect from 'react-glitch-effect';
import gif from '../Images/tenor.gif'



class Instruction  extends Component {
render(){
  // console.log(this.props.question);
  return(
<div>
<img className= "exed2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fxemoji_u274C.svg/1024px-Fxemoji_u274C.svg.png" onClick={this.props.clicked}/>
<div className="popup2">
<span ></span>
<span className="right"></span>
<span></span>
<span className="left"></span>
<p> Darn! You've been captured... You wake up and you can't move your head but you feel your body restrained in some sort of machine. A screen comes on
in front of you and the following message appears.
Human I have captured you. I am kind and will give you a chance if you prove your intelligence. There are 6 different robots,
correctly guess who I am based on what you think you learned about me and I will let you go. Click the ? if you believe this is an ability i posses. I must warn you...
failure to select the correct bot will result in termination.
</p>
</div>

                </div>
  )
}
}

export default Instruction
