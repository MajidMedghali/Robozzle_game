
# Projet Robot Programming

- [Sujet du projet](https://www.labri.fr/perso/renault/working/teaching/projets/2021-22-S6-Js-Robot.php)

- [Page sur thor](https://thor.enseirb-matmeca.fr/ruby/projects/projetss6-robot)

//////////////////////////////////////////////////////////////////////////////////

NAME OF PUZZLES AVAILABLE :

-"puzzle1"
-"puzzle2"
-"puzzle3"
-"ssh"
-"Learning Stack"
-"Right On Red"
-"Bumbling Bee"
-"The star-studded path I"

/////////////////////////////////////////////////////////////////////////////////

ACTIONS AVAILABLE :

-"MOVE" (go forward)
-"LEFT" (turn left)
-"RIGHT" (turn right)
-"CALL_I" (call function number I)
-"TURNRED" (turn the color of the tile to red)
-"TURNGREEN" (turn the color of the tile to green)
-"TURNBLUE" (turn the color of the tile to blue)

/////////////////////////////////////////////////////////////////////////////////

PREDICATS AVAILABLE :
-"NO_COLOR"
-"RED"
-"GREEN"
-"BLUE"

/////////////////////////////////////////////////////////////////////////////////

HOW TO PLAY IN MODE TEXT ?

>>cd projetss6-robot-15528
>>echo 'SOLUTION'  > file_that_contains_the_solution.json
>>npm start "name of the puzzle" file_that_contains_the_solution.json or node main.js "name of the puzzle" file_that_contains_the_solution.json

/////////////////////////////////////////////////////////////////////////////////

HOW TO WRITE A SOLUTION IN MODE JSON ?

-For example in a file.json we can find {"sol":[F1,F2...]}
     
-FI=[INST1,INST2....]
-INSTI=[ACTION,PREDICAT]
-Example :
	 {"sol":[[ ["MOVE","NO_COLOR"],["LEFT","GREEN"],["RIGHT","RED"],["TURNRED","GREEN"],["CALL_1","NO_COLOR"]]}
	 
/////////////////////////////////////////////////////////////////////////////////

HOW TO PLAY WHITH YOUR OWN PUZZLE IN MODE TEXT ?

>>cd projetss6-robot-15528
>>echo 'SOLUTION WITH PUZZLE'  > file_that_contains_the_solution_and_the_puzzle.json
>>npm start file_that_contains_the_solution_and_the_puzzle.json or node main.js file_that_contains_the_solution_and_the_puzzle.json

/////////////////////////////////////////////////////////////////////////////////

HOW TO WRITE A SOLUTION AND A PUZZLE IN MODE JSON ?

-For example in a file.json we can find {"sol":[F1,F2...], "puzzle": {...}}
     
-FI=[INST1,INST2....]
-INSTI=[ACTION,PREDICAT]
-Example :
	 {"sol":[[ ["MOVE","NO_COLOR"],["LEFT","GREEN"],["RIGHT","RED"],["TURNRED","GREEN"],["CALL_1","NO_COLOR"] ]],
	 "puzzle": {
		   "id":1,
     		   "title":"puzzle1",
     		   "stars":1,
     		   "about":"",
		   "robotCol":3,
		   "robotRow":1,
		   "robotDir":0,
		   "subs":[3,0,0,0,0],
		   "board":["                ",
		   	    "   bbbbbbbbr    ",
		            "           b    ",
		            "           b    ",
		            "           B    ",
		            "                ",
		            "                ",
		            "                ",
		            "                ",
		            "                ",
		            "                ",
		            "                "]
		   }
	}

/////////////////////////////////////////////////////////////////////////////////


HOW TO PLAY IN MODE WEBSITE ?

>>cd projetss6-robot-15528
>>make gen
-open a new terminal
>>firefox http://localhost:1234/ &

-chose a puzzle
-you can fill the fields in the website
-when the game is over click play again ! then try again .

