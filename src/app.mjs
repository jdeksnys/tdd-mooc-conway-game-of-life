import { GenerateFullRle } from "./logic.mjs";
import { fileURLToPath } from 'url';
import process from 'process';
import fs from 'fs';


// differentiate cli app run and import run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    function PrintUsage(){
        console.error("\tUsage: node app.mjs <full_path> <number>");
    }
    
    let filePath;
    let no;
    
    try{
        const args = process.argv.slice(2);
        filePath = args[0];
        no = parseInt(args[1]);
        if(args.length != 2 || !no){
            PrintUsage();
            process.exit(1);
        }
    
    } catch {
        PrintUsage();
        process.exit(1);
    }
    
    try{
        let res = GenerateFullRleReponse(filePath, no);
        // console.log(res);
        process.stdout.write(res);
    } catch {
        console.error("Error in parsing/calculating pattern.");
    }
} else {
}


export function GenerateFullRleReponse(filePath, no){
    if(!fs.existsSync(filePath)){
        throw new Error("file not found");
    }
    return GenerateFullRle(filePath, no);
}