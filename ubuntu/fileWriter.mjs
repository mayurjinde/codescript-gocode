import * as fs from 'fs'
import * as path from 'path'

 function makeCodeFile(code,filename,directoryPath){
 
  if(!fs.existsSync(directoryPath))
  fs.mkdirSync(directoryPath);
  const filePath=path.join(directoryPath,filename)
  // console.log('code',code)
//   fs.writeFile(filePath,code,(err)=>{
//     if(err)
//     console.log(err)
// else
// console.log(filePath,'is written successfully')

//   })

  fs.writeFileSync(filePath,code)
}

const code = `
// Your code here
console.log('Hello, world!');
`;

const filename = 'example.js';
const directory = './output';

export default makeCodeFile

// makeCodeFile(code,filename,directory)