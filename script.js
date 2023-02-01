class CricketMatch {
  static MAX_OUTS = 11
  static MAX_OVERS = 20

  constructor() {
    this.teams = {
      a: new Team(),
      b: new Team(),
      current: "a",
      next: "b"
    }
    this.outs = 0
    this.balls = 0
    this.overs = 0
    this.results = []
  }

  get teamAScoreboard() { return this.#scoreboard("a") }
  get teamBScoreboard() { return this.#scoreboard("b") }

  #scoreboard(team) {
    let scoreboard = {
      runs: this.teams[team].runs, 
      outs: 0,
      balls: 0,
      overs: 0
    }
    
    if( this.teams.current === team ) {
      scoreboard = {...scoreboard,
                    outs: this.outs, 
                    balls: this.balls, 
                    overs: this.overs
                   }  
    }
    return scoreboard
  }

  changeSides() {
    this.outs = 0
    this.balls = 0
    this.overs = 0
    let temp = this.teams.current;
    this.teams.current = this.teams.next;
    this.teams.next = temp;
  }

  addResult(result) {
    let newResult = {
      team: this.teams.current,
      annotations: []
    }
    
    if (Number.isInteger(result) ) {
      newResult.type = "runs"
      newResult.number = result
      this.balls++
    } else if (result === "out") {
      newResult.type = "out"
      this.outs++
    } else {
      newResult.type = "ball"
      this.balls++
    }

    if (this.balls > 5) {
      newResult.annotations.push("over")
      this.overs++
    }

    if (this.outs === CricketMatch.MAX_OUTS || this.overs === CricketMatch.MAX_OVERS) {
      this.changeSides()
      newResult.annotations.push("innings complete")      
    }

    this.results.push(newResult)
    
    this.teams[this.teams.current].runs = this.results
      .filter( result => result.team === this.teams.current && result.type === "runs" )
      .reduce( (sum,result) => sum += result.number, 0 )
  }
}

class Team {
  constructor() {
    // arbitrary information
    this.runs = 0
  }
}

class TeamDisplay {
  static categories = ["runs","outs","balls"]
  static #padding = {top:5,bottom:5,inter:2}
  
  constructor( drawingInfo, data ) {
    this.drawingInfo = drawingInfo
    this.data = data
  }

  draw() {
    const w = this.drawingInfo.w/TeamDisplay.categories.length;
    textSize((this.drawingInfo.h - TeamDisplay.#padding.top - TeamDisplay.#padding.bottom - TeamDisplay.#padding.inter)/2)

    for( let i = 0; i < TeamDisplay.categories.length; i++ ) {
      const x = this.drawingInfo.x + i * w
      let y = this.drawingInfo.y
      fill( this.drawingInfo.color )
      stroke("black")
      rect( x,y,w,this.drawingInfo.h )
      noStroke()
      fill( this.drawingInfo.textColor )
      y += TeamDisplay.#padding.top + textSize()
      text( TeamDisplay.categories[i], 
           x + w/2 - textWidth(TeamDisplay.categories[i])/2, 
           y )
      y += TeamDisplay.#padding.inter + textSize()
      text( this.data[TeamDisplay.categories[i]],
          x + w/2 - textWidth(this.data[TeamDisplay.categories[i]])/2,
          y )
    }
  }
}

let match = new CricketMatch()

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textFont("Georgia");
  noLoop()
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  
  const teamA = match.teamAScoreboard;
  const teamB = match.teamBScoreboard;

  let displayA = new TeamDisplay({
      x:width/4 - 70, 
      y:height/2 - 20,
      w:140,
      h:40,
      color: color(255, 0, 0, 100),
      textColor: color("black")
    }, 
    teamA 
  );
  displayA.draw()
  let displayB =  new TeamDisplay(
    {x:3*width/4 - 70, y:height/2 - 20, w:140,h:40, color: color(0, 0, 255, 100), textColor: color('black') }, teamB );
  displayB.draw();
}

function keyPressed() { //issue: the runs only get added until after the mouse click
  if (key === 'p') {
    match.addResult("out")
  }
  if (key === 'b') {
    match.addResult("ball")
  }
  if (key === "1" || key === "2" || key === "4" || key === "6") {
    match.addResult(int(key))
  }
  redraw()
}