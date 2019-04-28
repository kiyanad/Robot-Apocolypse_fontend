import React, { Component } from 'react';
import './CSS/Screen.css';
import Screen from './Components/Screen'
import Popup from './Components/Popup'

import Typed from 'react-typed';
import Typist from 'react-typist';
import fetch from 'isomorphic-fetch'
import runtimeEnv from '@mars/heroku-js-runtime-env'



class App extends Component {
  state = {
    gameStarted: false,
    prompt: "Go to bed early or Stay Up all night?",
    choiceA: "Go to bed early",
    choiceB: "Stay up all night",
    turn: 1,
    route: "none",
    choices:[],
    alarm: false,
    robots: null,
    robot: null,
    choiceC: "",
    newrobots: [],
    choosen: null,
    bot: {id: 12804, name:"ZW-3", hear:true , see: false , arms: false,  speed:true , wheels: true , jump: true , doors: false, stairs: false, talk: false ,  laser: false, heat: true, gas: true, robothead: "95"},
    win: false,
    lose:false,
    playerturn: 5,
    over: false

  }

// INITIAL FETCH TO GET ROBOTS AND CHOICES //
  componentDidMount(){
    // debugger
    fetch(`https://robot-apocolypse-backend.herokuapp.com/api/v1/choices`)
      .then(res => res.json())
      .then(choices => this.setState({
        choices: choices.choice
      }))

      fetch("https://robot-apocolypse-backend.herokuapp.com/api/v1/robots")
        .then(res => res.json())
        .then(robots => this.setState({
          robots: robots.robot,
          newrobots: robots.robot
        }))
  }

// CHECKS IF THE ROBOTS HAVE BEEN SAVED TO STATE THEN SAVING RANDOM BOT TO VAR //
  componentDidUpdate(prevState){
    debugger
    // fetch("https://robot-apocolypse-backend.herokuapp.com/api/v1/choices")
    //   .then(res => res.json())
    //   .then(choices => this.setState({
    //     choices: choices.choice
    //   }))
    //
    //   fetch("https://robot-apocolypse-backend.herokuapp.com/api/v1/robots")
    //     .then(res => res.json())
    //     .then(robots => this.setState({
    //       robots: robots.robot,
    //       newrobots: robots.robot
    //     }))
    if(this.state.robots !== null){
        if(this.state.robot == null){
          const mybot = this.state.robots[Math.floor((Math.random()*this.state.robots.length))]
            this.setState({
              robot: mybot
            })
          }
        }
        // if(prevState.retry !== undefined){
        if(this.state.playerturn !== 0 && this.state.playerturn !== null){
        if(this.state.retry){
          debugger
          fetch("https://robot-apocolypse-backend.herokuapp.com/api/v1/choices")
            .then(res => res.json())
            .then(choices => this.setState({
              choices: choices.choice
            }))

            fetch("https://robot-apocolypse-backend.herokuapp.com/api/v1/robots")
              .then(res => res.json())
              .then(robots => this.setState({
                robots: robots.robot,
                newrobots: robots.robot
              }))
              this.setState({
                playerturn: this.state.playerturn - 1,
                retry: false
              })
        }
        else if(this.state.redo){
          debugger
          this.setState({
            playerturn: this.state.playerturn - 1,
            redo: false
          })
    }
  }
  else if (this.state.playerturn == 0){
    this.setState({
      over: true,
      redo:false,
      retry: false,
      playerturn: null
    })
  }


}
      // }

  // RENDERS MAIN SCREEN IF GAME IS STARTED //

    goToScreen = () => {
      this.setState({
        gameStarted: true
        })
    }

    changePath =(choices, choice) => {
      if(choices.choiceA == choice){
        const options = this.state.choices.filter(choice => choice.turn == this.state.turn)
        const filteredOptions = options.filter(choice => choice.route == this.state.route)
        const reFilteredOptions = filteredOptions.filter(choice => choice.from == this.state.prompt)
        const newPath = reFilteredOptions.find(choice => choice.path == "left")
      const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
debugger
        const choice = this.state.choices[0].path
        if(this.state.route == "none"){
          debugger
        this.setState({
          prompt: newPath.prompt,
          choiceA: newPath.choiceA,
          choiceB:newPath.choiceB,
          turn: this.state.turn + 1,
          route: "a"
        })
      }

        if(this.state.route !== "none" && newPath.choiceA !== "Captured"){
          debugger
          this.setState({
            prompt: newPath.prompt,
            choiceA: newPath.choiceA,
            choiceB:newPath.choiceB,
            turn: this.state.turn + 1,
          })
        }




////////////////// IF IT IS NOT YOUR FIRST TURN //////////////////
        if(this.state.route !== "none"){
  ///////////////// IF YOU STEP ON A NAIL AND SCREAM //////////////////////
  if(newPath.choiceB == "Charge At"){
    ///////////////////////// IF IT CAN HEAR ////////////////////////////
    ////////////////////////// TURN 10 ///////////////////////////////
    if(this.state.robot.hear){
      const rightPath = newerPath.find(choice => choice.robotpath == "a")
      debugger

      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        })
      }
///////////////////////IF IT CANT HEAR /////////////////////
    else {
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      debugger


      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        })
      }
    }
//////////////////////// END STEP ON A NAIL //////////////////////////

////////////////////// IF YOU SET YOUR ALARM ////////////////////
  if (this.state.choiceA == "Set Alarm") {
    this.setState({
      alarm: true
    })
  }
  ////////////////////// End OF ALARM ////////////////////




//7 different combinations
// # see true arms true jump false -
// # see true arms true jump true
// # see false arms false jump false
// # see true arms false jump true
// # see false arms true jump false
// # see false arms true jump true
// # see false arms false jump true
      // SET ROBOT TRAP CLOSET
if(this.state.choiceA == "Watch from Closet" || this.state.prompt == "You decide to hide in the kitchen"){
  if(this.state.robot.see){
    if(this.state.robot.arms){
      if(this.state.robot.jump){
        //// CAN SEE JUMP && ARMS ////////
          const rightPath = newerPath.find(choice => choice.robotpath == "b")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
          })
        }
        ////// CAN SEE AND ARMS
      else {
        if(this.state.robot.see && this.state.robot.arms && this.state.robot.jump == false && this.state.choiceA == "Watch from Closet"){
          const rightPath = newerPath.find(choice => choice.robotpath == "a")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
          })
        }
      }


    }
    /////// CAN SEE AND JUMP //////
    else {
      if(this.state.robot.jump){
        if(this.state.robot.see && this.state.robot.arms == false && this.state.robot.jump  && this.state.choiceA == "Watch from Closet"){
          const rightPath = newerPath.find(choice => choice.robotpath == "d")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
          })
        }
      }
    }
  }
  //////////// CANT SEE ////////////
  else {
    if(this.state.robot.arms) {
      if(this.state.robot.jump) {
          const rightPath = newerPath.find(choice => choice.robotpath == "f")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
      }
      else {
          const rightPath = newerPath.find(choice => choice.robotpath == "e")
          debugger

        if(rightPath !== undefined){
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }
      }
    }
    else{
      if(this.state.robot.jump){
        const rightPath = newerPath.find(choice => choice.robotpath == "g")
        debugger

        this.setState({
          prompt: rightPath.prompt,
          choiceA: rightPath.choiceA,
          choiceB:rightPath.choiceB,
          turn: this.state.turn + 1,
          route: "a"
        })
      }
      else{
        const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
        const rightPath = newerPath.find(choice => choice.robotpath == "c")
        debugger

        this.setState({
          prompt: rightPath.prompt,
          choiceA: rightPath.choiceA,
          choiceB:rightPath.choiceB,
          turn: this.state.turn + 1,
          route: "a"
        })
      }
    }
  }
}



// IF THE ROBOT IS FAST OR SLOW WHEN YOU THROW THE BALL

if(this.state.robot.see && this.state.choiceA == "throw at stairs") {
  if(this.state.speed){
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
    })
  }
  else{
    const rightPath = newerPath.find(choice => choice.robotpath == "b")
    debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
    })
  }
}
                                        // END TRAP




      // HEAT SENSOR
  if(this.state.choiceA == "Run out and grab her" || this.state.choiceA == "Make run "){
    if(this.state.see){
      const rightPath = newerPath.find(choice => choice.robotpath == "a")
      debugger

      // debugger
      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
      })
    }
    else{
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      debugger

      // debugger
      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
    })
    }
  }

// IF ALARM GOES OFF OR NOT

if(this.state.choiceA == "Continue"){
  if(this.state.alarm){
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger

    // debugger
    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
      })
    }
    else{
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      debugger

      // debugger
      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
        })
      }
    }


//////////////// IF ROBOT CAN GO UPSTAIRS AND HEAR ALARM //////////

    if(this.state.prompt == "You are thinking of a plan when your alarm goes off. Crap you quickly turn it off. Okay you have a plan..."){
      if(this.state.stairs){
        const rightPath = newerPath.find(choice => choice.robotpath == "a")
        debugger

        // debugger
        this.setState({
          prompt: rightPath.prompt,
          choiceA: rightPath.choiceA,
          choiceB:rightPath.choiceB,
          turn: this.state.turn + 1,
          route: "a"
          })
        }
      else{
        if(this.state.gas){
          const rightPath = newerPath.find(choice => choice.robotpath == "b")
          debugger

          // debugger
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
            })
          }




        else if(this.state.laser){
          const rightPath = newerPath.find(choice => choice.robotpath == "c")
          debugger

          // debugger
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
          })
        }
      }
    }

///////////////////////// END ALARM ////////////////////////


if(this.state.prompt == "You decide to hide your sister in the closet because you figure it would be best for you to handle this one alone. You ask for her phone and tell her you are going to try to call your phone to get the robot to go upstairs. She tells you she does not think thats a good idea and if you get her a picture she might be able to figure out which robot it is."){
  this.setState({
    called:true
  })
}


///////////////// HIDE IN CLOSET /////////////
if ("You throw the ball at the robot and it immediatly turns and starts coming toward the living room. You close the door and you see a bright light coming from underneath."){
  if(newPath.choiceB !== "Charge At"){
  if(this.state.robot.doors){
    const rightPath = newerPath.find(choice => choice.robotpath == "b")
    debugger
if(rightPath !== undefined){
    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
      })
    }
    }

  else {
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger
if(rightPath !== undefined){
    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
      })
    }
    }
  }
}


///////////////////////////IF ROBOT HAS HEAT SENSORS OR NOT WHEN YOU ARE IN THE KITCHEN HIDING BEHIND THE COUNTER ////////////////


if(this.state.choiceA == "Continue" && this.state.turn == 12 ){
  if(this.state.robot.see){
    const rightPath = newerPath.find(choice => choice.robotpath == "b")
    debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
    })
  }
  else if(this.state.robot.heat){
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
    })
  }
}

///////////////////////////////END HIDE BEHIND COUNTER  ////////////////////////////

  if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false){
    if(this.state.robot.gas){
      const rightPath = newerPath.find(choice => choice.robotpath == "a")
      debugger

      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
      })
    }
    else if (this.state.robot.laser){
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      debugger

      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
      })
    }
  }

      //////////////////Robot cant hear door IN KITCHEN ////////////////////////////////
      if(this.state.route !== "none" && newPath.prompt == "you open the door and run and grab your sister. The two of you make it to the stairs where the robot is at the bottom waiting."){
        debugger
        if(this.state.robot.stairs){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "a")
          debugger


          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
        })

      }
      }
      //////////////////////// IF ROBOT CAN GO UPSTAIRS AND CAN SEE ////////////
////////////////////////// TURN 12 ////////////////////////////////////
      if(this.state.route !== "none" && newPath.prompt.includes("you open the door and the robot is at the end of the hallway.")){
        if(this.state.robot.see){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
          const rightPath = newerPath.find(choice => choice.robotpath == "a")
          debugger

          if(rightPath !== undefined){
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
        })
      }
        }
        else{
          const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
          const rightPath = reFilteredOptions[1]

          debugger

if(rightPath !== undefined){
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
        })
      }
        }
      }

////////////////////////////// END ////////////////////////////

  if(newPath.prompt.includes("You tell her whats going on and she wants to leave.")){
    debugger
  }

  if(this.state.route !== "none" && newPath.choiceA == "Captured"){
    debugger
this.setState({
  prompt: newPath.prompt,
  choiceA: null,
  choiceB:null,
  turn: this.state.turn + 1,
  choiceC: "Captured"
})
}

  }
}




      else if(choices.choiceB == choice) {
      const options = this.state.choices.filter(choice => choice.turn == this.state.turn)
      const filteredOptions = options.filter(choice => choice.route == this.state.route)
      const reFilteredOptions = filteredOptions.filter(choice => choice.from == this.state.prompt)

      const newPath = reFilteredOptions.find(choice => choice.path == "right")
debugger
        const choice = this.state.choices[0].path
        console.log(newPath.choiceB);

        if(this.state.route == "none"){
          debugger
        this.setState({
          prompt: newPath.prompt,
          choiceA: newPath.choiceA,
          choiceB:newPath.choiceB,
          turn: this.state.turn + 1,
          route: "b"
})
        }

        if(this.state.route !== "none" && newPath.choiceA !== "Captured"){
          debugger
        this.setState({
          prompt: newPath.prompt,
          choiceA: newPath.choiceA,
          choiceB:newPath.choiceB,
          turn: this.state.turn + 1,


        })
}









/////////////////////////////////////////////// robot fast or slow //////////////////////
if(this.state.route !== "none" && newPath.prompt == "You run out and the robot start to emit this strange gas and you begin to get very sleepy.."){
  debugger
  if(this.state.robot.gas){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger


    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
  })

}
else{
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger


  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
})
}
}



/////////////////////////////////////////////// robot fast or slow //////////////////////
if(this.state.route !== "none" && newPath.choiceB == "wait for it to open" && this.state.turn == 12){
  debugger
  if(this.state.robot.speed){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger


    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
  })

}
else{
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger


  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
})
}
}




//////////////////////////////////////// STEP ON NAIL ///////////////////////////////////////////////////
if(this.state.route !== "none" && newPath.choiceB == "Charge At"){
  debugger
  if(this.state.robot.hear){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger


    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
  })

}
}

///////////////// Go get Your sister //////////////////////
/////////////////TURN 10 //////////////
if(this.state.route !== "none" && newPath.prompt == "you open the door and run and grab your sister. The two of you make it to the stairs where the robot is at the bottom waiting."){
  debugger
  if(this.state.robot.stairs){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
    debugger


    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
  })

}
}
//////////////////////////TURN 11 //////////////////////
///////////////// IF ROBOT CAN GO UPSTAIRS ////////////////
if(this.state.route !== "none" && newPath.choiceB == "Wait and see what happens"){
  if(this.state.robot.stairs){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "a")
debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
    })

  }
}


if(this.state.route !== "none" && newPath.choiceB == "Wait and see what happens"){
  if(this.state.robot.stairs == false){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "b")
debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
  })

}
}



////////////////////////////////////////////////////////////////////////////




        if(newPath.prompt == "You get very still and quiet when suddenly you hear the doorknob turning..."){
          if(this.state.robot.doors){
            const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
            const rightPath = newerPath.find(choice => choice.robotpath == "a")
        debugger

            this.setState({
              prompt: rightPath.prompt,
              choiceA: rightPath.choiceA,
              choiceB:rightPath.choiceB,
              turn: this.state.turn + 1,
          })
          }
          if(this.state.robot.doors == false && this.state.robot.gas){
            const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
            const rightPath = newerPath.find(choice => choice.robotpath == "b")
        debugger

            this.setState({
              prompt: rightPath.prompt,
              choiceA: rightPath.choiceA,
              choiceB:rightPath.choiceB,
              turn: this.state.turn + 1,
          })
          }
          if(this.state.robot.doors == false && this.state.robot.laser){
            const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
            const rightPath = newerPath.find(choice => choice.robotpath == "c")
        debugger

            this.setState({
              prompt: rightPath.prompt,
              choiceA: rightPath.choiceA,
              choiceB:rightPath.choiceB,
              turn: this.state.turn + 1,
          })
          }
        }
//////////////////////////////////Waiting at closet ////////////////////////////
        if(this.state.choiceB == "wait and see" && this.state.turn == 14 && this.state.robot.doors){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "a")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }

        if(this.state.choiceB == "wait and see" && this.state.turn == 14 && this.state.robot.doors == false && this.state.robot.gas){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "b")
          debugger

          debugger
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }

        if(this.state.choiceB == "wait and see" && this.state.turn == 14 && this.state.robot.doors == false && this.state.robot.laser){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "c")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }


        if(this.state.called && this.state.prompt == "You decide to make a run for it. At this point if the robot sees you then it sees you. Do you go back around throught the kitchen or try to outsmart the robot in the living room?"){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "b")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }

        ///////////////////////////RUN OUT THE CLOSET ///////////////////////////////

        if(this.state.choiceB == "Run out of there" && this.state.turn == 13 && this.state.robot.gas){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "a")
          debugger

          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }

        if(this.state.choiceB == "Run out of there" && this.state.turn == 13 && this.state.robot.laser){
          const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
          const rightPath = newerPath.find(choice => choice.robotpath == "b")
          debugger

          debugger
          this.setState({
            prompt: rightPath.prompt,
            choiceA: rightPath.choiceA,
            choiceB:rightPath.choiceB,
            turn: this.state.turn + 1,
            route: "a"
        })
        }




if(this.state.robot.doors == false && this.state.choiceA == "throw at stairs" && this.state.turn == 12) {
  // debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors && this.state.choiceA == "throw at stairs" && this.state.turn == 12 ) {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}


if(this.state.robot.laser && this.state.prompt == "You cant just let your sister die so you run out and grab her. Although the robot seems to be staring at your sister it doesnt make any moves but you notice a red light coming from its antenna"){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})}

if(this.state.robot.gas && this.state.prompt == "You cant just let your sister die so you run out and grab her. Although the robot seems to be staring at your sister it doesnt make any moves but you notice a red light coming from its antenna"){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})}

if(this.state.robot.stairs == false && this.state.robot.laser && this.state.prompt == "You decide to hide your sister in the closet because you figure it would be best for you to handle this one alone. You ask for her phone and tell her you are going to try to call your phone to get the robot to go upstairs. She tells you she does not think thats a good idea and if you get her a picture she might be able to figure out which robot it is.") {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})

}
if(this.state.robot.stairs == false && this.state.robot.gas && this.state.prompt == "You decide to hide your sister in the closet because you figure it would be best for you to handle this one alone. You ask for her phone and tell her you are going to try to call your phone to get the robot to go upstairs. She tells you she does not think thats a good idea and if you get her a picture she might be able to figure out which robot it is.") {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})

}

if(this.state.robot.stairs && this.state.prompt == "You decide to hide your sister in the closet because you figure it would be best for you to handle this one alone. You ask for her phone and tell her you are going to try to call your phone to get the robot to go upstairs. She tells you she does not think thats a good idea and if you get her a picture she might be able to figure out which robot it is.") {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "c")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})

}


if(this.state.robot.doors && this.state.prompt == "You go back to the closet to tell your sister to stay put as you go see the robot. You tell her you didnt take a picture and decided to go with your plan of calling. You give her her phone back so you can call her when you grab yours."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see && this.state.robot.laser && this.state.prompt == "You go back to the closet to tell your sister to stay put as you go see the robot. You tell her you didnt take a picture and decided to go with your plan of calling. You give her her phone back so you can call her when you grab yours."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see == false && this.state.robot.laser && this.state.prompt == "You go back to the closet to tell your sister to stay put as you go see the robot. You tell her you didnt take a picture and decided to go with your plan of calling. You give her her phone back so you can call her when you grab yours."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "c")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see && this.state.robot.gas && this.state.prompt == "You go back to the closet to tell your sister to stay put as you go see the robot. You tell her you didnt take a picture and decided to go with your plan of calling. You give her her phone back so you can call her when you grab yours."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "d")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see == false && this.state.robot.gas && this.state.prompt == "You go back to the closet to tell your sister to stay put as you go see the robot. You tell her you didnt take a picture and decided to go with your plan of calling. You give her her phone back so you can call her when you grab yours."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "e")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}










if(this.state.robot.doors && this.state.prompt == "You decide to go get your sister because the two of you should definently stick together. You tell her that you decided to call your phone instead of take a picture. She was a bit upset but she laughed it off and said it was probably the better call I dont know much anyways."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see && this.state.robot.laser && this.state.prompt == "You decide to go get your sister because the two of you should definently stick together. You tell her that you decided to call your phone instead of take a picture. She was a bit upset but she laughed it off and said it was probably the better call I dont know much anyways."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see == false && this.state.robot.laser && this.state.prompt == "You decide to go get your sister because the two of you should definently stick together. You tell her that you decided to call your phone instead of take a picture. She was a bit upset but she laughed it off and said it was probably the better call I dont know much anyways."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "c")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see && this.state.robot.gas && this.state.prompt == "You decide to go get your sister because the two of you should definently stick together. You tell her that you decided to call your phone instead of take a picture. She was a bit upset but she laughed it off and said it was probably the better call I dont know much anyways."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "d")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.robot.see == false && this.state.robot.gas && this.state.prompt == "You decide to go get your sister because the two of you should definently stick together. You tell her that you decided to call your phone instead of take a picture. She was a bit upset but she laughed it off and said it was probably the better call I dont know much anyways."){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "e")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if (this.state.robot.gas && this.state.prompt == "You carefully watch as the robot makes its way through your hallway when suddenly you see your sister coming down the stairs! Crap why did you leave her!") {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})}

if (this.state.robot.laser && this.state.prompt == "You carefully watch as the robot makes its way through your hallway when suddenly you see your sister coming down the stairs! Crap why did you leave her!") {
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.prompt == "You throw the ball at the stairs to see if the robot will go and get it. Awesome your plan worked and the robot slowly went to the ball. It gets to the ball and stops turning drectly towards the closet! Its starts coming closer and you shut the door." ){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  debugger
  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})        }

if(this.state.turn == 14 && this.state.robot.doors && this.state.prompt == "You throw the ball at the stairs to see if the robot will go and get it. Awesome your plan worked and the robot slowly went to the ball. It gets to the ball and stops turning drectly towards the closet! Its starts coming closer and you shut the door." ){
  debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  debugger
  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})        }

// IF THE ROBOT IS FAST OR SLOW WHEN YOU THROW THE BALL

if(this.state.robot.doors && this.state.choiceA == "tell your sister to open the door"){
  // debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

if(this.state.robot.doors == false && this.state.choiceA == "tell your sister to open the door"){
  // debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}


//////////////////////////IN CABINT OPEN DOOR ////////////////////////////
if(this.state.choiceA == "open door" && this.state.robot.doors){
  // debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

//////////////////////////IN CABINT Cant OPEN DOOR ////////////////////////////
if(this.state.choiceA == "open door" && this.state.robot.doors == false){
  // debugger
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  if(this.state.turn == 12){
    if(this.state.robot.laser){
  const rightPath = newerPath.find(choice => choice.robotpath == "c")
  debugger

  if (rightPath !== undefined){
  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"

})
}


}
   if(this.state.robot.gas){
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  if (rightPath !== undefined){
  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"

})
}


}
}
}

//////////////////////////////////////CABINET GAS //////////////////////////
if(this.state.prompt == "you wait for door to open. nothing happens and you dont hear anything from outside" && this.state.robot.gas){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

//////////////////////////////CABINET LASER /////////////////////////////////
if(this.state.prompt == "you wait for door to open. nothing happens and you dont hear anything from outside" && this.state.robot.gas == false){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

//////////////////Robot cant hear door IN KITCHEN ////////////////////////////////
if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false && this.state.robot.gas){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
    }

    if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false && this.state.robot.laser){
      const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      debugger

      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
    })
        }

  /////////////////////////////////////MAKE FOOD PATH ////////////////////////
  if(this.state.choiceB == "go make food" && this.state.robot.heat && this.state.robot.laser){
    const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
    const rightPath = newerPath.find(choice => choice.robotpath == "b")
    debugger

    this.setState({
      prompt: rightPath.prompt,
      choiceA: rightPath.choiceA,
      choiceB:rightPath.choiceB,
      turn: this.state.turn + 1,
      route: "a"
  })
      }
      if(this.state.choiceB == "go make food" && this.state.robot.heat && this.state.robot.gas){
        const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
        const rightPath = newerPath.find(choice => choice.robotpath == "a")
        debugger

        this.setState({
          prompt: rightPath.prompt,
          choiceA: rightPath.choiceA,
          choiceB:rightPath.choiceB,
          turn: this.state.turn + 1,
          route: "a"
      })
          }

          if(this.state.choiceB == "go make food" && this.state.robot.see && this.state.robot.laser){
            const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
            const rightPath = newerPath.find(choice => choice.robotpath == "d")
            debugger

            this.setState({
              prompt: rightPath.prompt,
              choiceA: rightPath.choiceA,
              choiceB:rightPath.choiceB,
              turn: this.state.turn + 1,
              route: "a"
          })
              }

              if(this.state.choiceB == "go make food" && this.state.robot.see && this.state.robot.gas){
                const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
                const rightPath = newerPath.find(choice => choice.robotpath == "c")
                debugger

                this.setState({
                  prompt: rightPath.prompt,
                  choiceA: rightPath.choiceA,
                  choiceB:rightPath.choiceB,
                  turn: this.state.turn + 1,
                  route: "a"
              })
                  }
////////////////////////////////////MOVE OUT THE WAY ////////////////////////
////////////////////////////////////SEE ////////////////////////
if(this.state.choiceB == "Move out the way" && this.state.robot.see ){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
}

////////////////////////////////////HEAT////////////////////////
if(this.state.choiceB == "Move out the way" && this.state.robot.heat ){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "right")
  const rightPath = newerPath.find(choice => choice.robotpath == "b")
  debugger

  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
  })
}

if(this.state.route !== "none" && newPath.choiceA == "Captured"){
  debugger
this.setState({
  prompt: newPath.prompt,
  choiceA: null,
  choiceB:null,
  turn: this.state.turn + 1,
  choiceC: "Captured"


})
}

      }
  }

    checked = (e) => {

      if(e.target.nextElementSibling.classList.contains("check-true")){
        // debugger
        // choosen.style.backgroundColor = "#111845a6"
        // this.setState({
        //   clicked: false
        // })
      }
      else if(e.target.classList.contains("color")){
        // debugger
          let pick = e.target.nextElementSibling.innerText
          let choosen = document.getElementById(`${pick}`)
          if(e.target.nextElementSibling.classList.contains("check-true")){
            // debugger
            // choosen.style.backgroundColor = "#111845a6"
            // this.setState({
            //   clicked: false
            // })
          }

          if(e.target.nextElementSibling.classList.contains("check-true") == false) {
        // let pick = event.target.innerText
        let choosen = document.getElementById(`${pick}`)

        if (choosen !== null){
        choosen.style.backgroundColor = "rgba(30, 130, 76, 1)"
        // debugger
        this.setState({
          clicked: true
        })
      }
}
      const checkbox = e.target.nextElementSibling
    checkbox.classList.toggle("check-true");
    const type = ["hear","stairs", "doors", "arms", "speed"]
    const options = [{choice: "hear", index: 1}, {choice: "see", index: 2}, {choice: "arms", index: 3}, {choice: "speed", index: 4}, {choice: "wheels", index: 5}, {choice: "jump", index: 6}, {choice: "doors", index: 7}, {choice: "stairs", index: 8}, {choice: "talk", index: 9}, {choice: "laser", index: 10}, {choice: "heat", index: 11}, {choice: "gas", index: 12}]
    options.map( type =>{
      // debugger
    if(checkbox.classList.contains("check-true")){
      // debugger
    if(e.target.nextElementSibling.id == `${type.choice}`){
      // debugger
      const robots = this.state.newrobots
      var typer = `${type.choice}`
      // debugger
      if (typer == "hear") {
        // debugger
        let hear = document.getElementById(`hear`)
        hear.style.backgroundColor = "green"

      let newList = this.state.newrobots.filter(robot => robot.hear == true)
      // debugger
      this.setState({
        newrobots: newList
      })
    console.log(newList);
    }

    if (typer == "see") {
      let hear = document.getElementById(`see`)
      hear.style.backgroundColor = "green"
    let newList = robots.filter(robot => robot.see == true)
    // debugger
    this.setState({
      newrobots: newList
    })
  console.log(newList);
  }
  if (typer == "arms") {
    let hear = document.getElementById(`arms`)
    hear.style.backgroundColor = "green"
  const newList = this.state.newrobots.filter(robot => robot.arms == true)
  this.setState({
    newrobots: newList
  })
console.log(newList);
}
if (typer == "wheels") {
  let hear = document.getElementById(`wheels`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.wheels == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}
if (typer == "speed") {
  let hear = document.getElementById(`speed`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.speed == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}
if (typer == "jump") {
  let hear = document.getElementById(`jump`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.jump == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}

if (typer == "doors") {
  let hear = document.getElementById(`doors`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.doors == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}

if (typer == "stairs") {
  let hear = document.getElementById(`stairs`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.stairs == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}

if (typer == "heat") {
  let hear = document.getElementById(`heat`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.heat == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}

if (typer == "laser") {
  let heat = document.getElementById(`laser`)
  heat.style.backgroundColor = "green"
// debugger
const newList = this.state.newrobots.filter(robot => robot.laser == true)

this.setState({
  newrobots: newList
})
console.log(newList);
}


if (typer == "gas") {
  let hear = document.getElementById(`gas`)
  hear.style.backgroundColor = "green"
const newList = this.state.newrobots.filter(robot => robot.gas == true)
this.setState({
  newrobots: newList
})
console.log(newList);
}

}

}
else if(checkbox.classList.contains("check-true") == false) {
  var typer = `${type.choice}`

  // debugger
  if (typer == "see") {
  let list = this.state.robots.filter(robot => robot.see == false)
  let newList = this.state.newrobots.concat(list)
  debugger
  this.setState({
    newrobots: newList
  })
console.log(newList);
}
}
// if(checkbox.classList.contains("check-true") == false){
//   // debugger
//   if(e.target.nextElementSibling.innerText == "laser"){
//     let heat = document.getElementById(`heat`)
//     heat.style.backgroundColor = "#111845a6"
//   }
//   this.setState({
//     newrobots: this.state.robots
//   })
//
// }
})
  }
}

  clicked = (e) => {
    debugger
    if(e.target.parentElement.parentElement.classList.contains("show") || e.target.parentElement.parentElement.parentElement.classList.contains("show")){
      const selected = this.state.robots.find(robot => robot.name == e.target.id)
      const choosen = document.querySelector(".popup-hidder")
      choosen.style.visibility = "hidden"
      choosen.classList.toggle("show");

    }
    else{
    const selected = this.state.robots.find(robot => robot.name == e.target.id)
    const choosen = document.querySelector(".popup-hidder")
    choosen.style.visibility = "visible"
    // debugger
  choosen.classList.toggle("show");
  this.setState({
    choosen: selected
  })
    // debugger
  }
}

unclicked = () => {
  let selected = Array.from(document.querySelectorAll(".check-true"))
  selected.map(node => {node.classList.toggle("check-true"); node.style.backgroundColor = "#111845a6"
})

  this.setState({
    newrobots: this.state.robots
  })
}

choosen = (robot) => {
  console.log(robot);
  let bot = this.state.robot
  if(robot.id == bot.id){
this.setState({
  win: true
})  }
  else{
    this.setState({
      lose: true
    })
  }
}


retry = () => {
  debugger
  this.setState({
    gameStarted: true,
    prompt: "Go to bed early or Stay Up all night?",
    choiceA: "Go to bed early",
    choiceB: "Stay up all night",
    turn: 1,
    route: "none",
    choices:[],
    alarm: false,
    robots: null,
    robot: this.state.robot,
    choiceC: "",
    newrobots: [],
    choosen: null,
    bot: this.state.robot,
    win: false,
    lose:false,
    retry: true,
      })
    document.querySelector(".popup-hidder").style="visibility: hidden;"
}


 redo = () => {
this.setState({
  lose:false,
  redo: true

})
document.querySelector(".popup-hidder").style="visibility: hidden;"
this.unclicked()
}
  render() {
    // debugger

    console.log(this.state.playerturn);
    console.log(this.state.robot)

    return (
      <div>
      {(this.state.gameStarted && this.state.robot) || this.state.retry?
        <div>
        {this.state.over? <p> Sorry no more lives </p> :
          <div>
        {this.state.win? <p> Congrats You Win!!! </p>:
          <div>
        <div className="popup-hidder"><Popup robot={this.state.choosen} clicked={this.clicked} selected={this.choosen} lost={this.state.lose} retry={this.retry} redo={this.redo} turn={this.state.playerturn}/> </div>
 <Screen robot={this.state.robot} prompt={this.state.prompt} choiceA={this.state.choiceA} choiceB={this.state.choiceB} choiceC={this.state.choiceC} changePath={this.changePath} robots={this.state.newrobots} checked={this.checked} clicked={this.clicked} unclicked={this.unclicked} retry={this.state.retry} turn={this.state.playerturn}/> </div> } </div> }</div>  :
      <div className="tv">
      <button className="skip" onClick={this.goToScreen}> Skip Intro </button>

  <p>
  <Typist>
  <span> The Beginning</span>
  <Typist.Backspace count={9} delay={600} />
  <span> End </span>
  <Typist.Backspace count={4} delay={600} />
  <span> Backgruo </span>
  <Typist.Backspace count={3} delay={100} />
  <span>ound </span>



  <Typist.Delay ms={900} />
  <br />
  In 3080 with the help of constantly developing artificial intelligence, robots had risen up from human power. However, Instead of taking over, they decided to leave and were never seen or heard from again…until now..
 Through unknown sources, the world was able to determine the exact day in which a robot apocalypse was coming. Tomorrow. News stations have reported it will occur sometime during the middle of the night and encourages evryone to go to sleep early since there will be no survivors. You live with your sister who has already decided to pack it up early tonight.
</Typist>

</p>

<div className="scanlines" />
<div className="glow" />
  	</div>
  }
  </div>
)}
}

export default App;

// <Popup robot={this.state.robot}/>
