import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Screen from './Components/Screen'

class App extends Component {
  state = {
    gameStarted: true,
    prompt: "Go to bed early or Stay Up all night?",
    choiceA: "Go to bed early",
    choiceB: "Stay up all night",
    turn: 0


  }

  // RENDERS MAIN SCREEN IF GAME IS STARTED //

    goToScreen = () => {
      this.setState({
        gameStarted: true
        })
    }

    changePath =(choice) => {
      if(choice){
        this.setState({
          prompt:"You did it",
          choiceA: "Im a genius",
          choiceB:"This is awesome",
          turn: this.state.turn + 1

        })
      }
      // debugger
    }



  render() {
    console.log(this.state);
    const playing = this.state.gameStarted
    return (
      <div>
      {this.state.gameStarted ? <Screen prompt={this.state.prompt} choiceA={this.state.choiceA} choiceB={this.state.choiceB} changePath={this.changePath}/> :
      <div className="galaxy">
      <button onClick={this.goToScreen}> Lets do this </button>
      <button> Nah man actually nevermind </button>
  	<div className="fall">
  		<div className="away">
  		The year is 3080 and robots have risen up and created their own planet..
  		</div>
  <p>
  	<i>The Background</i>
    in 2050 robots had finally adapted to the human lifestyle and became superior. Instead of taking over, they decided to leave and were never seen again. Through unknown sources, the world was able to determine the exact day in which a robot apocalypse was coming. Tomorrow. News stations have reported it will occur sometime during the middle of the night and encourages evryone to go to sleep early and there will be no survivors. You live with your sister who has already decided to pack it up early tonight.
</p>
  	</div>
</div>
  }
  </div>
)}
}

export default App;
