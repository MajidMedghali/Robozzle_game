//display the puzzle 
export function display(p){
    p.board.forEach((aLine,i)=>{
        let s="";
        aLine.split('').forEach((aChar,j) => {
            switch(aChar){
            case 'g':s+="\x1b[42m ";break;
            case 'r':s+="\x1b[41m ";break;
            case 'b':s+="\x1b[44m ";break;
            case ' ':s+="\x1b[40m ";break;
            case 'B':s+="\x1b[44m*";break;
            case 'G':s+="\x1b[42m*";break;
            case 'R':s+="\x1b[41m*";break;
            }
            if(i===p.robotRow && j===p.robotCol){
                switch(p.robotDir){
                case 0:s+=">" ;break;
                case 1:s+="^" ;break;
                case 2:s+="<" ;break;
                case 3:s+="v" ;break;
                }
            }
            else{
                s+=" ";
            }
            s+="\x1b[0m";
        });
        console.log(s); 
    });
}

