import { Dolos,Report } from "@dodona/dolos-lib";

import {writeFile} from 'fs';

const files = [
'files/copy.txt',
'files/hello.txt'
];

const dolos = new Dolos();
const report = await dolos.analyzePaths(files);



for (const pair of report.allPairs()) {

    console.log(pair.leftFile.path, pair.rightFile.path,pair.similarity)
    console.log(pair.leftCovered,pair.totalCoverLeft(),pair.totalCoverRight())
    console.log(pair.leftTotal)
    console.log(pair.leftCovered/pair.leftTotal)
    console.log(pair.rightCovered/pair.rightTotal)
  console.log(pair.overlap)
  
//   console.log(pair.leftEntry)

//  for(const fr of pair.buildFragments()){

//  }

}