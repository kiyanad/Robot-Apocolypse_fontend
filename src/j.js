if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false){
  if(this.state.robot.gas){
    onst rightPath = newerPath.find(choice => choice.robotpath == "a")
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
if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false && this.state.robot.gas){
  const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
  const rightPath = newerPath.find(choice => choice.robotpath == "a")
  this.setState({
    prompt: rightPath.prompt,
    choiceA: rightPath.choiceA,
    choiceB:rightPath.choiceB,
    turn: this.state.turn + 1,
    route: "a"
})
    }

    if(this.state.choiceB == "Stay in the Kitchen" && this.state.robot.hear == false && this.state.robot.laser){
      const newerPath = reFilteredOptions.filter(choice => choice.path == "left")
      const rightPath = newerPath.find(choice => choice.robotpath == "b")
      this.setState({
        prompt: rightPath.prompt,
        choiceA: rightPath.choiceA,
        choiceB:rightPath.choiceB,
        turn: this.state.turn + 1,
        route: "a"
    })
        }
