import { getPuzzleFrmName }  from './puzzles.js';
import { moveRobot,gameOver,term,initialize } from  './game.js';
import { verifyProgram, verifyPuzzle } from  './verify.js';
import fs from'fs';




//verify that the puzzle and the solution exists in the line command
if(process.argv.length<3) {
    console.log("ERROR PLEASE ENTRE THE PUZZLE AND THE SOLUTION");
}
else {
    //get the puzzle and the solution from the line command
    let puzzle;
    let sol;
    if(process.argv.length === 3){
        let file = fs.readFileSync(process.argv[2]);
        puzzle = JSON.parse(file).puzzle;
        sol = JSON.parse(file).sol;
    }
    else{
        let file = fs.readFileSync(process.argv[3]);
        sol = JSON.parse(file).sol;
        puzzle = getPuzzleFrmName(process.argv[2]);
	

    }
    console.log("Program:");
    console.log(sol);
   

    //initialis the context context
    let puzzleCopy = {
        ...puzzle
    };
    let context = initialize(puzzleCopy,sol);
    console.log("Puzzle:");
    term(context);
    console.log();
    //verify the program is compatible
    //if yes execute it on the puzzle
    if(verifyPuzzle(context) && verifyProgram(context)) {

	let a = setInterval(function() {
            console.log("Puzzle name : " + context["puzzle"].title );
            console.log(context["prog"][context["pc"][0]][context["pc"][1]]);
            moveRobot(context,term);
            if(gameOver(context) === 1){
		clearInterval(a);
            }
	},50);
    }
}

