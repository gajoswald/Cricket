/*
     when overs reaches 20 or outs reaches 11
     innings is over for team 1 and can't add anymore to score1
     then score2 is activated 
*/

class Team {
  constructor() {
    this.stats = {
      runs: 0,
      outs: 0,
      balls: 0,
      overs: 0
    }
    this.results = [];
  }

  get runs() { return this.stats.runs }
  get outs() { return this.stats.outs }
  get balls() { return this.stats.balls }
  get overs() { return this.stats.overs }

  addRuns(runs) { 
    this.addResult({
      type: "runs",
      number: runs
    })
  }
  
  addOut() { 
    this.addResult({
      type: "outs",
    })
  }
  
  addBall() { 
    this.addResult({
      type: "balls",
    })
    if( this.balls > 5 ) {
      this.addOver() 
    }
  }

  addOver() {
    this.stats.balls = 0
    this.addResult({
      type: "overs",
    })
  }

  addResult(result) {
    this.stats[result.type] += result.type === "runs" ? result.number : 1  
  }
}

let teams = [
  new Team(),
  new Team()
]

currentTeam = 0

let results = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER);
  textFont("Georgia");
  rectMode(CENTER); //rect for score 1
  textSize(20);
  noLoop()
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  
  for (let i = 0; i < 2; i++) {
    text("runs  outs  balls", width / 4 + width / 2 * i, height / 2 - 40);
  }

  text("Team 1", width / 4, height / 4); //text for score1
  text(teams[0].runs + "   " + teams[0].outs + "    " + teams[0].overs + "." + teams[0].balls, width / 4, height / 2);
  
  fill(255, 0, 0, 100);
  rect(width / 4, height / 2, 140, 40);

  fill(0); //text for score2
  text("Team 2", 3 / 4 * width, height / 4);
  text(teams[1].runs + "   " + teams[1].outs + "    " + teams[1].overs + "." + teams[1].balls, 3 / 4 * width, height / 2);

  fill(0, 0, 255, 100); //rect for score2
  rect(3 / 4 * width, height / 2, 140, 40);

  if( teams[currentTeam].outs > 10 || teams[currentTeam].overs > 19 ) {
    text("innings is over", width/2 - textWidth("innings is over")/2, 20 )
    currentTeam = currentTeam + 1
    if( currentTeam > 1 ) {
      const winningTeam = teams[0].runs > teams[1].runs ? "Team 1" : "Team 2"
      text(`${winningTeam} wins`, width/2 - textWidth(`${winningTeam} wins`)/2, 40)
    }
  }
}

function keyPressed() { //issue: the runs only get added until after the mouse click
  if( key === 'p' ) {
    teams[currentTeam].addOut()
  }
  if( key === 'b' ) {
    teams[currentTeam].addBall()
  }
  if (teams[currentTeam].outs < 11) {
    if( key === "1" || key === "2" || key === "4" || key === "6" ) {
      teams[currentTeam].addRuns(int(key))
      teams[currentTeam].addBall();
    }
  }
  redraw()
} 