import { readContents } from "./logic.mjs";
import { fileURLToPath } from 'url';
import process from 'process';


// differentiate cli app run and import run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    function PrintUsage(){
        console.error("\tUsage: node app.mjs <file_path> <number>");
    }
    
    let filePath;
    let number;
    
    try{
        const args = process.argv.slice(2);
        filePath = args[0];
        number = parseInt(args[1]);
        if(args.length != 2 || !number){
            PrintUsage();
            process.exit(1);
        }
    
    } catch {
        PrintUsage();
        process.exit(1);
    }
    
    console.log(`\t you entered: ${filePath} ${number}`);
} else {
    console.log('required as a module');
}


export function CalculateResultPattern(filePath, number){
    let res = readContents(filePath);
    return "o2b$b2o$2ob!";
}