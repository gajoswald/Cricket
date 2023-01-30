# p5.js

This is the Template Repl for p5.js.

p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.

[Check out the official docs here](https://p5js.org/reference/).

The purpose of this project is to create a T-20 cricket score board. In this project I set the number of runs, outs, and balls played to three variables. There's four options to increase the runs - press the 1, 2, 4, or 6 keys. I used the p key to increase the out players and the b key to increase the number of balls (and with that the number of overs). I set two exit conditions with if statements - whichever one is met first means a message is displayed saying the game is over. I added console.log text to say which team scored the highest number of runs. Then I added a second scoreboard object (for the second team) - the variables keeping track of the score were key value pairs. I found it valuable to brush up on object syntax for this project, and it helped to clean up and organize the code. 

There's an issue where key presses don't register until the mouse clicks the screen for the first time. This could be due to my operating system, or the setup of p5. I'd like to expand on the project by adding buttons to increment the runs and have the number of balls increase automatically. Finally, I need to find a more efficient to write the exit conditions, and currently I'm not able to deactivate score1 when the overs reach20. Maybe I could create an array of objects since Score1 and Score2 are so similar, or create a new function expressely for the purpose of deactivating Score1.

