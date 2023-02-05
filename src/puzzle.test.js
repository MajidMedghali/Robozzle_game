

import {puzzleTab, getPuzzleFrmId, getPuzzleFrmName} from './puzzles';
describe('test_all_functions', () => {

    test('the function return the first puzzle', () => {
        expect(getPuzzleFrmId(1,puzzleTab).id).toBe(1);
        expect(getPuzzleFrmId(1,puzzleTab).stars).toBe(1);
        expect(getPuzzleFrmId(1,puzzleTab).robotCol).toBe(3);
        expect(getPuzzleFrmId(1,puzzleTab).robotDir).toBe(0);
        expect(getPuzzleFrmId(3,puzzleTab).id).toBe(3);
	expect(getPuzzleFrmId(0,puzzleTab).id).toBe(1);
        
    });
    test('test getPuzzleFrmName', () => {
        let puzzle=getPuzzleFrmName("ssh");
        expect(puzzle.id).toBe(4);
        expect(puzzle.robotDir).toBe(2);
        expect(getPuzzleFrmName("NoPuzzle").id).toBe(1);

    });
   

});
