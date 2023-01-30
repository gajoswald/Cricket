/*
     when overs reaches 20 or outs reaches 11
     innings is over for team 1 and can't add anymore to score1
     then score2 is activated 
*/

let score1 = {
  runs: 0,
  outs: 0,
  balls: 1,
  overs: 0,
  addOuts: function() {
    if (key === "p") {
      this.outs++;
    }
  },
  addBalls: function() {
    if (key === "b") {
      this.balls++;
    }
  },
  addOvers: function() {
    if (this.balls > 5) { //when # of balls in an over reaches 6
      this.balls = 0;
      this.overs++; //1 over = 6 balls
    }
  }
};

let score2 = {
  runs: 0,
  outs: 0,
  balls: 1,
  overs: 0,
  addOuts: function() {
    if (key === "p") {
      this.outs++;
    }
  },
  addBalls: function() {
    if (key === "b") {
      this.balls++;
    }
  },
  addOvers: function() {
    if (this.balls > 5) { //when # of balls in an over reaches 6
      this.balls = 0;
      this.overs++; //1 over = 6 balls
    }
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  textSize(20);
  textAlign(CENTER);
  textFont("Georgia");
  for (let i = 0; i < 2; i++) {
    text("runs  outs  balls", width / 4 + width / 2 * i, height / 2 - 40);
  }

  text("Team 1", width / 4, height / 4); //text for score1
  text(score1.runs + "   " + score1.outs + "    " + score1.overs + "." + score1.balls, width / 4, height / 2);

  rectMode(CENTER); //rect for score 1
  fill(255, 0, 0, 100);
  rect(width / 4, height / 2, 140, 40);

  fill(0); //text for score2
  text("Team 2", 3 / 4 * width, height / 4);
  text(score2.runs + "   " + score2.outs + "    " + score2.overs + "." + score2.balls, 3 / 4 * width, height / 2);

  fill(0, 0, 255, 100); //rect for score2
  rect(3 / 4 * width, height / 2, 140, 40);

  score1.addOvers();
  score2.addOvers();

  if (score1.outs > 10 || score1.overs > 19) { //when all 11 players are out on team 1 or overs reach 20
    console.log("innings 1 is over");
    fill(255, 0, 0);
    text(score1.runs + " runs to beat", width / 2, height / 2)
  }

  if (score2.outs > 10 || score2.overs > 19) {  //when all 11 players are out on team 2 or overs reach 20
    console.log("innings 2 is over");
    if (score2.runs > score1.runs) {
      console.log("player 2 wins");
    }
    else {
      console.log("player 1 wins");
    }
  }
}

function keyPressed() { //issue: the runs only get added until after the mouse click
  if (score1.outs < 11) {
    if (key === "1") {
      score1.runs += 1;
    }
    if (key === "2") {
      score1.runs += 2;
    }
    if (key === "4") {
      score1.runs += 4;
    }
    if (key === "6") {
      score1.runs += 6;
    }
    score1.addBalls();
    score1.addOuts();
  }
  else {
    if (score2.outs < 11) {
      if (key === "1") {
        score2.runs += 1;
      }
      if (key === "2") {
        score2.runs += 2;
      }
      if (key === "4") {
        score2.runs += 4;
      }
      if (key === "6") {
        score2.runs += 6;
      }
      score2.addBalls();
      score2.addOuts();
    }
  }
}


