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

    print (doc1.similarity(doc2)) 
    print(doc2.similarity(doc1))

    
def checkTextSimShingles(text1,text2):

    if len (text1)*10>len(text2):
        doc1=nlp(text=str(text1))
        doc2=nlp(text=str(text2))
        return doc1.similarity(doc2)
    else:
        result = 0
        l = len(text1)
        shingle_size = l // 5
        num_shingles = len(text2) // shingle_size
        for i in range(num_shingles):
            shingle = text2[i * shingle_size : (i + 1) * shingle_size]
            doc1 = nlp(text=str(text1))
            doc2 = nlp(text=str(shingle))
            result = max(result, doc1.similarity(doc2))
        return result