import spacy
nlp = spacy.load('en_core_web_sm')


def funcToCheckSimShingles(text1,text2):
    document1=nlp(text=str(text1))
    document2=nlp(text=str(text2))
    return document1.similarity(document2)

    if len (text1)*10>len(text2):
        document1=nlp(text=str(text1))
        document2=nlp(text=str(text2))
        return document1.similarity(document2)
    else:
        result=0
        l=len(text1)
        for i in text2[:2*l:max(10,l//10)]:
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

    
