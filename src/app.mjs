import { readContents } from "./logic.mjs";


function printUsage(){
    console.error("\tUsage: node app.mjs <file_path> <number>");
}

export function importFile(filePath){
    let res = readContents(filePath);
    return res;
}


let filePath;
let number;

try{
    const args = process.argv.slice(2);
    filePath = args[0];
    number = parseInt(args[1]);
    if(args.length != 2 || !number){
        printUsage();
        process.exit(1);
    }

} catch {
    printUsage();
    process.exit(1);
}

console.log(`\t you entered: ${filePath} ${number}`);