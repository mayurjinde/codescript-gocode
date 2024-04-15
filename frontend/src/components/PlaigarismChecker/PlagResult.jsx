import { DiffEditor } from "@monaco-editor/react"
import { useRef } from "react";

export const PlagResult=(props)=>{

 const text=`
 import spacy
 nlp = spacy.load('en_core_web_sm')
 
 
 
 def checkTextSim(text1,text2):
     
 
     doc1=nlp(text=str(text1))
     doc2=nlp(text=str(text2))
     return doc1.similarity(doc2)
 
 
 if __name__ == '__main__':
     with open('./docs/copy.txt','r') as f:
         doc1=nlp(text=f.read())
 
     with open('./docs/query.txt','r') as f:
         doc2=nlp(text=f.read())
 
     print (doc1.similarity(doc2)) # 0.999999954642
     print(doc2.similarity(doc1))
 
     
 def checkTextSimShingles(text1,text2):
     
     if len (text1)*10>len(text2):
         doc1=nlp(text=str(text1))
         doc2=nlp(text=str(text2))
         return doc1.similarity(doc2)
     else:
         result=0
         l=len(text1)
         for i in text2[:2*l:l//3]:
             doc1=nlp(text=str(text1))
             doc2=nlp(text=str(i))
             result=max(result,doc1.similarity(doc2))
         return result
  
 `

 const modified=`
 import spacy
 nlp = spacy.load('en_core_web_sm')
 
 
 def funcToCheckSimShingles(text1,text2):
     
     if len (text1)*10>len(text2):
         document1=nlp(text=str(text1))
         document2=nlp(text=str(text2))
         return document1.similarity(document2)
     else:
         result=0
         l=len(text1)
         for i in text2[:2*l:l//3]:
             document1=nlp(text=str(text1))
             document2=nlp(text=str(i))
             result=max(result,document1.similarity(document2))
         return result
 
 
 def funcToCheckSim(text1,text2):
     
 
     document1=nlp(text=str(text1))
     document2=nlp(text=str(text2))
     return document1.similarity(document2)
 
 
 if __name__ == '__main__':
     with open('./docs/copy.txt','r') as f:
         document1=nlp(text=f.read())
 
     with open('./docs/query.txt','r') as f:
         document2=nlp(text=f.read())
 
     print (document1.similarity(document2)) # 0.999999954642
     print(document2.similarity(document1))
 
     
 
 `

 
 const editorRef = useRef(null);

 function handleEditorDidMount(editor, monaco) {
  editorRef.current = editor;
}




    return <>
     <div>
     <br/>
     <br/>
     <br/>
     <br/>
  <DiffEditor
  height={'90vh'}  
    original={text}
   modified={modified}
   language="python"
   onMount={handleEditorDidMount}
   options={{
    // renderSideBySide:false,
    inDiffEditor: true,
}}
   theme="vs-dark"
  />
     </div>
    </>




}